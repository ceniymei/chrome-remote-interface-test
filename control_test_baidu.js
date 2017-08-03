const System = require('./lib/general_start');
const Util = require('./lib/util');


var callback = async function (client) {
    try {
        const { DOM, Emulation, Network, Page, Runtime, Input } = client;

        // enable events then start!
        await Promise.all([Network.enable(), Page.enable(), DOM.enable()]);

        await Page.navigate({ url: 'http://www.baidu.com' });

        await Page.loadEventFired(async (time) => {
            let util = new Util(client);

            await util.click('#kw');
            await util.input('hello world');
            await util.click('#su');

            setTimeout(() => {
                System.stop();
            }, 10000);

        });
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            // await client.close();
            // chrome.kill();
        }
    }
    // const version = await CDP.version({port: chrome.port});
    // console.log(version['User-Agent']);
}

System.start(false).then(callback);