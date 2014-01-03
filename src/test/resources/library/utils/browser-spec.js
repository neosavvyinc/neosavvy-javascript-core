describe("Neosavvy.Core.Utils.BrowserUtils", function () {
    describe("info", function () {

        it("Should return a hash that defines a browser attribute", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().browser).toBeDefined();
        });

        it("Should return a hash that defines a browserVersion attribute", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().browserVersion).toBeDefined();
        });

        it("Should return a hash that defines an os attribute", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().os).toBeDefined();
        });

        it("Should return a hash that defines an osVersion attribute", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().osVersion).toBeDefined();
        });

        it("Should have a browser attribute matching the function by the same name", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().browser).toEqual(Neosavvy.Core.Utils.BrowserUtils.browser());
        });

        it("Should have a browserVersion attribute matching the function by the same name", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().browserVersion).toEqual(Neosavvy.Core.Utils.BrowserUtils.browserVersion());
        });

        it("Should have the os attribute matching the function by the same name", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().os).toEqual(Neosavvy.Core.Utils.BrowserUtils.os());
        });

        it("Should have an osVersion attribute matching the function by the same name", function () {
            expect(Neosavvy.Core.Utils.BrowserUtils.info().osVersion).toEqual(Neosavvy.Core.Utils.BrowserUtils.osVersion());
        });
    });

    describe("browser", function () {

        describe("INTERNET_EXPLORER", function () {
            describe("IE 8", function () {
                beforeEach(function() {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 9", function () {
                beforeEach(function() {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 10", function () {
                beforeEach(function() {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isInternetExplorer()).toBeTruthy();
                });
            });

            describe("IE 11", function () {
                beforeEach(function() {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)");
                });

                it("Should equal the INTERNET_EXPLORER def when ie userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.INTERNET_EXPLORER);
                });

                it("Should be able to return a boolean from the is method", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isInternetExplorer()).toBeTruthy();
                });
            });
        });

        describe("FIREFOX", function () {
            beforeEach(function() {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.0) Gecko/20100101 Firefox/26.0");
            });

            it("Should equal the FIREFOX def when firefox userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.FIREFOX);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isFirefox()).toBeTruthy();
            });
        });

        describe("CHROME", function () {
            beforeEach(function() {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should equal the CHROME def when chrome userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.CHROME);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isChrome()).toBeTruthy();
            });
        });

        describe("SAFARI", function () {
            beforeEach(function() {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1");
            });

            it("Should equal the SAFARI def when safari userAgent", function () {
                console.log(Neosavvy.Core.Utils.BrowserUtils.info())
                expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.SAFARI);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isSafari()).toBeTruthy();
            });
        });

        describe("OPERA", function () {
            beforeEach(function() {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0.1241.53");
            });

            it("Should equal the OPERA def when opera userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.browser()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.BROWSER.OPERA);
            });

            it("Should be able to return a boolean from the is method", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isOpera()).toBeTruthy();
            });
        });

    });

    describe("os", function () {

    });

    describe("browserVersion", function () {

    });

    describe("osVersion ", function () {

    });
});