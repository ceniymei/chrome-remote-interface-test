'use strict';

class Util {
    constructor(client) {
        this.client = client;
        this.DOM = this.client.DOM;
        this.Input = this.client.Input;
        this.Runtime = this.client.Runtime;
    }

    async getCurrentLocationHref() {
        let result = await this.Runtime.evaluate({ expression: 'location.href' })
        return result.result.value;
    }

    async getDocumentNodeId() {
        let { root: { nodeId: nodeId } } = await this.DOM.getDocument();
        return nodeId;
    }

    async getElementNodeIdByQuery(queryString) {
        const documentNodeId = await this.getDocumentNodeId();

        let options = {
            selector: queryString,
            nodeId: documentNodeId
        }

        const { nodeId: id } = await this.DOM.querySelector(options);
        return id;
    }

    async input(text) {
        for (let i = 0, l = text.length; i < l; i++) {
            await this.Input.dispatchKeyEvent({ type: 'char', modifiers: 0, text: text[i] });
        }
    }

    async click(queryString) {
        const elementId = await this.getElementNodeIdByQuery(queryString);
        const { model: { content: content } } = await this.DOM.getBoxModel({ nodeId: elementId });
        const options = {
            x: content[0],
            y: content[1],
            button: 'left',
            clickCount: 1
        };

        options.type = 'mousePressed';
        await this.Input.dispatchMouseEvent(options);

        options.type = 'mouseReleased';
        await this.Input.dispatchMouseEvent(options);
    }

    async moveMouseToItem(queryString) {
        const elementId = await this.getElementNodeIdByQuery(queryString);
        const { model: { content: content } } = await this.DOM.getBoxModel({ nodeId: elementId });
        const options = {
            type: 'mouseMoved',
            x: content[0],
            y: content[1]
        };

        console.log('Moving.....');
        await this.Input.dispatchMouseEvent(options);
    }

    /**
     * 
     * @param {Array} settings 
     */
    async handleActions(settings) {
        let href = await this.getCurrentLocationHref();
        let currentSetting = settings.filter((setting) => {
            return setting.url == href;
        }).pop();

        if (!currentSetting) {
            return;
        }

        let promise = Promise.resolve();
        currentSetting.actions.forEach(async (action) => {
            promise = promise.then(() => {
                return this[action.type](action.value);
            });
        }, this);
    }

}

module.exports = Util;