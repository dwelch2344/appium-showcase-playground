require 'rubygems'
require 'selenium-webdriver'
capabilities = {
	'device' => 'Android',
	'browserName' => '',
	'platform' => 'Mac',
	'version' => '4.2',
	#'app' => 'showcase.apk',
	'app-package' => 'com.mcubed.mcubedshowcase',
	'app-activity' => 'com.mcubed.mcubedshowcase.activities.MainActivity'
}

server_url = "http://127.0.0.1:4723/wd/hub"

wd = Selenium::WebDriver.for(:remote, :desired_capabilities => capabilities, :url => server_url)
wd.find_element(:xpath, "//view[1]/window[1]/linear[1]/relative[2]/linear[1]/imagebutton[1]").click
wd.find_element(:xpath, "//view[1]/window[1]/linear[1]/relative[2]/linear[1]/text[1]").click
wd.find_element(:name, "Back Button").click
wd.find_element(:xpath, "//view[1]/window[1]/linear[1]/relative[2]/linear[3]/imagebutton[1]").click
wd.find_element(:xpath, "//view[1]/window[1]/linear[1]/relative[2]/linear[3]/text[1]").click
wd.find_element(:xpath, "//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[1]").send_keys "Dave Welch"
wd.find_element(:xpath, "//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[2]").send_keys "mCubed Labs"
wd.find_element(:xpath, "//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[3]").send_keys "dave.welch@mcubedlabs.com"
wd.find_element(:xpath, "//view[1]/window[2]/window[1]/scroll[1]/linear[1]/linear[2]/toggle[3]").click
wd.find_element(:xpath, "//view[1]/window[2]/window[1]/scroll[1]/linear[1]/textfield[4]").send_keys "Automated Android Spam..."
wd.quit
