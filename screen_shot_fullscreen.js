const System = require('./lib/general_start');
const fs = require('fs');

const viewport = [1440, 900];
const screenshotDelay = 10000; // ms

var callback = async function (client) {
    try {
        const { DOM, Emulation, Network, Page, Runtime } = client;

        // enable events then start!
        await Promise.all([Network.enable(), Page.enable(), DOM.enable()]);

        // change these for your tests or make them configurable via argv
        var device = {
            width: viewport[0],
            height: viewport[1],
            deviceScaleFactor: 0,
            mobile: false,
            fitWindow: false
        };

        // set viewport and visible size
        await Emulation.setDeviceMetricsOverride(device);
        // await Emulation.setVisibleSize({ width: viewport[0], height: viewport[1] });

        await Page.navigate({ url: 'https://www.vidaxl.se' });
        // await Page.loadEventFired();
        
        await Page.loadEventFired(async (time) => {
            const { root: { nodeId: documentNodeId } } = await DOM.getDocument();
            const { nodeId: bodyNodeId } = await DOM.querySelector({
                selector: 'body',
                nodeId: documentNodeId,
            });

            const { model: { height } } = await DOM.getBoxModel({ nodeId: bodyNodeId });

            // extend the viewport to display complete page
            // await Emulation.setVisibleSize({ width: device.width, height: height });
            // await Emulation.resetViewport();
            console.log({ width: device.width, height: height });
            
            await Emulation.setDeviceMetricsOverride({
                width: device.width, height: height, deviceScaleFactor: 0,
                mobile: false,
                fitWindow: false
            });
            await Emulation.setVisibleSize({ width: device.width, height: height });

            const screenshot = await Page.captureScreenshot({ format: "png", fromSurface: true });
            const buffer = new Buffer(screenshot.data, 'base64');
            fs.writeFile('desktop.png', buffer, 'base64', function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Screenshot saved');
                }
            });

            System.stop();
        });
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            // await client.close();
            // chrome.kill();
        }
    }
}

System.start().then(callback);