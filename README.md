# Appium Playground

This is a simple proving ground for Appium automated testing for Android & iOS. It's
assumed you've installed Appium and Mocha as global NPM modules. 

To run the tests, run `mocha -R spec *[platform]*.js` 

To deploy to SauceLabs, setup your credentials as environment variables as instructed
and then run `SAUCE=1 mocha -R spec *[platform]*.js` 

## Notes

To use our iOS showcase app as an example, you'll need to unzip `showcase.zip` 
and make the contents an `showcase.app`. 