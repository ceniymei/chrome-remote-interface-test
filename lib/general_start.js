const launch_chrome = require('./launch_chrome');
const CDP = require('chrome-remote-interface');


let chromeInstance = null;
let clientInstance = null;

module.exports = {
    start: async function (flag) {
        return launch_chrome(flag).then(async (chrome) => {
            console.log(`Chrome debuggable on port: ${chrome.port}`);
            chromeInstance = chrome;

            // connect to endpoint
            const client = await CDP({ port: chrome.port });
            clientInstance = client;

            const { Network } = client;

            // setup handlers
            Network.requestWillBeSent((params) => {
                console.log(params.request.url);
            });

            // // enable events then start!
            // await Promise.all([Network.enable(), Page.enable(), DOM.enable()]);

            return client;
        });
    },
    stop: function() {
        // close CDP
        if (clientInstance) {
            clientInstance.close();
        }

        // close chrome
        if (chromeInstance) {
            chromeInstance.kill();
        }
    }
}