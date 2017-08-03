const System = require('./lib/general_start');
const Util = require('./lib/util');

System.start(false).then(async (client) => {

    const { DOM, Network, Page } = client;
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
})
