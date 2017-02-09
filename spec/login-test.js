var webdriver = require('selenium-webdriver');


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
			this.driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

	      	this.driver.get('https://desktop.call-em-all.com/').then(done);

		});

		afterEach(function(done) {
			this.driver.quit().then(done);

		});

		it('I am not able to connect to the website', function(done) {
			var element = this.driver.findElement(webdriver.By.tagName( 'div' ));

			element.getAttribute( 'id' ).then(function(id) {
				expect(id).toBe( 'main' );
				done();
			});

		})


		it('I am able to log in with a valid Username and Password', function(done) {
			var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( '713210' );
			var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '5065' );
			var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

			element.click(done);

			this.driver.sleep(3000);

			this.driver.getCurrentUrl().then(function(url) {
				expect(url).toContain('broadcasts');
				done();
			});

		})

		it('I am not able to log in with an invalid password', function(done) {
			var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( '713210' );
			var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '1234' );
			var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

			element.click(done);

			this.driver.sleep(1000);

			this.driver.findElement(webdriver.By.id('main')).getText().then(function(text){
	    		expect(text).toMatch("We were not able to log you in, please check your username and password and try again.");
	    		done();   
			});
		})

		it('I am not able to log in with an invalid username', function(done) {
			var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( 'thisisinvalid' );
			var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '5065' );
			var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

			element.click(done);

			this.driver.sleep(1000);

			this.driver.findElement(webdriver.By.id('main')).getText().then(function(text){
	    		expect(text).toMatch("We were not able to log you in, please check your username and password and try again.");
	    		done();   
			});
		})


		// it('Clicking on the Contacts tab works', function(done) {
		// 	var username = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='1']")).sendKeys( '713210' );
		// 	var password = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='2']")).sendKeys( '5065' );
		// 	var element = this.driver.findElement(webdriver.By.xpath("//*[@tabindex='3']"));

		// 	element.click(done);

		// 	this.driver.sleep(3000);

		// 	var home = this.driver.findElement(webdriver.By.xpath("div[contains(.,'Contacts')]").click);

		// 	this.driver.sleep(2000);

		// 	this.driver.getCurrentUrl().then(function(url) {
		// 		expect(url).toContain('contacts');
		// 		done();
		// 	});

		// })



	});

});