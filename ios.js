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
    device: 'iPhone Simulator',
    deviceType: 'phone',
    name: "Showcase iOS",
    platform: "Mac 10.8",
    os: 'iOS 7',    
    version: "7.0",
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
  desired.app = "sauce-storage:showcase.zip";
  waitTime = 15 * 1000;
} else {
  // local config
  host = "localhost";
  port = 4723;

  desired.app = process.cwd() + "/showcase.app";
  waitTime = 5 * 1000;
}


console.log(timeout);


describe('Showcase iOS', function() {
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
    console.log("Starting run...");
    browser
      .sleep(waitTime)      
       .elementByName('icon contactus').click()
      .elementByName('Name').type('Dave Welch')
      .elementByName('Company').type('mCubed Labs')
      .elementByName('Email').type('dave.welch@mcubedlabs.com')
      .elementByXPath('//window[1]/scrollview[1]/textview[1]').type('Automated spam...')
      .elementByName('50k-75k').click()
      .elementByName('Budget Range').click()
      .sleep(waitTime) 
      .quit()
      .nodeify(done)
  });
});