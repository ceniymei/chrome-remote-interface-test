const System = require('./lib/general_start');
const fs = require('fs');

var callback = async function (client) {
  try {
    // extract domains
    const { Network, Page } = client;
    // setup handlers
    Network.requestWillBeSent((params) => {
      console.log(params.request.url);
    });
    // enable events then start!
    await Promise.all([Network.enable(), Page.enable()]);
    await Page.navigate({ url: 'https://github.com' });
    await Page.loadEventFired();
    const { data } = await Page.captureScreenshot();
    fs.writeFileSync('scrot.png', Buffer.from(data, 'base64'));
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
     System.stop();
    }
  }
  // const version = await CDP.version({port: chrome.port});
  // console.log(version['User-Agent']);
}

System.start().then(callback);