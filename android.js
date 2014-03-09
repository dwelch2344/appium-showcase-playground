/*global it:true, describe:true, before:true, after:true */

var wd = require("wd");
var q = require('q');

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var timeout = process.env.TIMEOUT || 30 * 1000;

var host, port, username, accessKey, desired, waitTime;

desired = {
    device: 'Android',
    deviceType: 'phone',
    name: "Showcase Android",
    platform: "Linux",
    'app-package': 'com.mcubed.mcubedshowcase',
    'app-activity': 'com.mcubed.mcubedshowcase.activities.MainActivity',
    version: "4.3",
    browserName: "",
    newCommandTimeout: 60,
    autoAcceptAlerts: true,
    useLocationServices: true
  };


if (process.env.SAUCE) {
  // Sauce Labs config
  host = "ondemand.saucelabs.com";
  port = 80;
  username = process.env.SAUCE_USERNAME;
  accessKey = process.env.SAUCE_ACCESS_KEY;
  timeout = 300000;
  desired.app = "sauce-storage:showcase.apk";
  waitTime = 15 * 1000;
} else {
  // local config
  host = "localhost";
  port = 4723;

  desired.app = process.cwd() + "/showcase.apk";
  waitTime = 5 * 1000;
}


console.log(timeout);


describe('Showcase Android', function() {
  this.timeout(timeout);

  // Instantiate a new browser session
  var browser;

  before(function(done) {
    console.log('Initializing browser...'.yellow);
    browser = wd.promiseChainRemote(host , port, username, accessKey);

    // See whats going on
    browser.on('status', function(info) {
      console.log(info.cyan);
    });
    browser.on('command', function(meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });

     browser
      .init(desired)
      .nodeify(done)
      ;

  });

  it('Should fill out a form', function(done) {
    var swipeOpts = {
        startX: 0.5
      , startY: 0.95
      , endX: 0.5
      , endY: 0.05
      , duration: 0.7
      };

    console.log("Starting run...");
    browser
      .sleep(waitTime)      
      // .elementByXPathIfExists("//view[1]/window[1]/linear[1]/relative[2]/linear[1]/imagebutton[1]").click()
      // .elementByXPathIfExists("//view[1]/window[1]/linear[1]/relative[2]/linear[1]/text[1]").click()
      // .elementByName("Back Button").click()
      .elementByXPathIfExists("//view[1]/window[1]/linear[1]/relative[2]/linear[3]/imagebutton[1]").click()
      .elementByXPathIfExists("//view[1]/window[1]/linear[1]/relative[2]/linear[3]/text[1]").click()
      .elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[1]").type("Dave Welch")
      .elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[2]").type("mCubed Labs")
      .elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[3]").type("dave.welch@mcubedlabs.com")
      .execute('mobile: swipe', [swipeOpts]).elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]")
      .elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]/linear[1]/linear[2]/toggle[3]").click()
      .elementByXPathIfExists("//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[4]").type("Automated Android Spam...")
      .sleep(waitTime)
      .quit()
      .nodeify(done)
  });
});