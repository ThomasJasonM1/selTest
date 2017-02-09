const webdriver = require('selenium-webdriver');
const urlRegex = require('url-regex');

const driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

// var capabilities = {
//   'browserName' : 'chrome', 
//   'browserstack.user' : 'seth11',
//   'browserstack.key' : '3oVWdrq4kVHqofK3EsQq'
// }

// var driver = new webdriver.Builder().
//   usingServer('http://hub-cloud.browserstack.com/wd/hub').
//   withCapabilities(capabilities).
//   build();



describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });


	describe('login-test', function() {
		beforeEach(function(done) {
			this.driver = driver

	      	this.driver.get('https://desktop.call-em-all.com/').then(done);

		});

		afterEach(function(done) {
			driver.closeBrowser;
			done();

		});


		it('I am not able to connect to the website', function(done) {
			var element = this.driver.findElement(webdriver.By.tagName( 'div' ));

			element.getAttribute( 'id' ).then(function(id) {
				expect(id).toBe( 'main' );
				done();
			});

		})


		it('I am not able to log in with valid information with an active account status', function(done) {
			var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( '713210' );
			var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '5065' );
			var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

			element.click(done);

			driver.sleep(5000);

			driver.getCurrentUrl().then(function(url) {
				expect(url).toContain('broadcasts');
				driver.close().then(function() {
					done();
				});
			});

		})


	});

});


// describe("long asynchronous specs", function() {
//     var originalTimeout;
//     beforeEach(function() {
//       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//       jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
//     });


// 	describe('login-test', function() {
// 		beforeEach(function(done) {
// 			this.driver = new driver

// 	      	this.driver.get('https://desktop.call-em-all.com/').then(done);

// 		});

// 		afterEach(function(done) {
// 			driver.closeBrowser;

// 		});


// 		it('I am not able to log in with an invalid password', function(done) {
// 			var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( '713210' );
// 			var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '123' );
// 			var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

// 			element.click(done);

// 			driver.sleep(5000);

// 			driver.getCurrentUrl().then(function(url) {
// 				expect(url).toContain('broadcasts');
// 				driver.close().then(function() {
// 					done();
// 				});
// 			});

// 		})


// 	});

// });