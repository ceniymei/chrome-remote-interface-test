const chromeLauncher = require('chrome-launcher');

// Optional: set logging level of launcher to see its output.
// Install it using: yarn add lighthouse-logger
// const log = require('lighthouse-logger');
// log.setLevel('info');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
module.exports = function launchChrome(headless = true) {
    return chromeLauncher.launch({
        // port: 9222, // Uncomment to force a specific port of your choice.
        chromeFlags: [
            //'--window-size=412,732',
            '--start-maximized',
            '--disable-gpu',
            '-hide-scrollbars',   // hide scrollbars
            // '--remote-debugging-port=9222',
            headless ? '--headless' : ''
        ]
    });
}