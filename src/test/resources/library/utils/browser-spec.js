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
                beforeEach(function () {
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
                beforeEach(function () {
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
                beforeEach(function () {
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
                beforeEach(function () {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
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
            beforeEach(function () {
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
            beforeEach(function () {
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
            beforeEach(function () {
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
            beforeEach(function () {
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
        describe("OSX", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.OSX);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isOsx()).toBeTruthy();
            });
        });

        describe("WINDOWS", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.WINDOWS);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isWindows()).toBeTruthy();
            });
        });

        describe("LINUX", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("﻿Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:23.0) Gecko/20100101 Firefox/23.0");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.LINUX);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isLinux()).toBeTruthy();
            });
        });

        describe("FREE_BSD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (X11; U; FreeBSD amd64; en-US; rv:1.8.0.8) Gecko/20061116 Firefox/1.5.0.8");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.FREE_BSD);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isFreeBsd()).toBeTruthy();
            });
        });

        describe("IPHONE", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.IPHONE);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isIphone()).toBeTruthy();
            });
        });

        describe("IPOD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A100a Safari/419.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.IPOD);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isIpod()).toBeTruthy();
            });
        });

        describe("IPAD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.IPAD);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isIpad()).toBeTruthy();
            });
        });

        describe("ANDROID", function () {
            describe("Phone", function () {
                beforeEach(function () {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
                });

                it("Should match the platform when provided in the userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.ANDROID);
                });

                it("Should work well with the is... call", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isAndroid()).toBeTruthy();
                });
            });

            describe("Tablet", function () {
                beforeEach(function () {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19");
                });

                it("Should match the platform when provided in the userAgent", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.ANDROID);
                });

                it("Should work well with the is... call", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.isAndroid()).toBeTruthy();
                });
            });
        });

        describe("BLACKBERRY", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.BLACKBERRY);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isBlackberry()).toBeTruthy();
            });
        });

        describe("J2ME", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.J2ME);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isJ2me()).toBeTruthy();
            });
        });

        describe("WEB_TV", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/3.0 WebTV/1.2 (compatible; MSIE 2.0)");
            });

            it("Should match the platform when provided in the userAgent", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.os()).toEqual(Neosavvy.Core.Utils.BrowserUtils.CONSTANTS.OS.WEB_TV);
            });

            it("Should work well with the is... call", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.isWebTv()).toBeTruthy();
            });
        });
    });

    describe("browserVersion", function () {
        it("Should always return a string value for the version", function () {
            expect(typeof Neosavvy.Core.Utils.BrowserUtils.browserVersion() === 'string').toBeTruthy();
        });

        describe("INTERNET_EXPLORER", function () {
            it("Should be able to return a version for 8", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729)");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("8.0");
            });

            it("Should be able to return a version for 9", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("9.0");
            });

            it("Should be able to return a version for 10", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("10.0");
            });

            it("Should be able to return a version for 11", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("11.0");
            });
        });

        describe("FIREFOX", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.356) Gecko/20100101 Firefox/26.356");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("26.356");
            });

            it("Should be able to retrieve a whole number version", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:26.0) Gecko/20100101 Firefox/26.0");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("26.0");
            });
        });

        describe("CHROME", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("31.0.1650.63");
            });

            it("Should be able to retrieve a whole number version", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0 Safari/537.36");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("31.0");
            });
        });

        describe("SAFARI", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("6.0.5");
            });

            it("Should be able to retrieve a whole number version", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0 Safari/536.30.1");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("6.0");
            });
        });

        describe("OPERA", function () {
            it("Should be able to retrieve a version with a decimal", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0.1241.53");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("17.0.1241.53");
            });

            it("Should be able to retrieve a whole number version", function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36 OPR/17.0");
                expect(Neosavvy.Core.Utils.BrowserUtils.browserVersion()).toEqual("17.0");
            });
        });
    });

    describe("osVersion ", function () {
        describe("OSX", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36");
            });

            it("Should return a decimalized version of the version for the os", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("10.8.5");
            });
        });

        describe("WINDOWS", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Windows NT 6.3; Win64; x64; Trident/7.0; rv:11.0) like Gecko");
            });

            it("Should provide the nt version of the windows os", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("6.3");
            });
        });

        describe("LINUX", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("﻿Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:23.0) Gecko/20100101 Firefox/23.0");
            });

            it("Should have a null osVersion with linux", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toBeNull();
            });
        });

        describe("FREE_BSD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (X11; U; FreeBSD amd64; en-US; rv:1.8.0.8) Gecko/20061116 Firefox/1.5.0.8");
            });

            it("Should have a null osVersion with free bsd", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toBeNull();
            });
        });

        describe("IPHONE", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should return the decimalized version of the iphone version", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("5.0");
            });
        });

        describe("IPOD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A100a Safari/419.3");
            });

            it("Should return the decimalized version for the ipod in question", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toBeNull();
            });
        });

        describe("IPAD", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
            });

            it("Should return a decimalized version for the iPad in question", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("5.0");
            });
        });

        describe("ANDROID", function () {
            describe("Phone", function () {
                beforeEach(function () {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
                });

                it("Should return the decimalized version 2.3.4 of the android platform", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("2.3.4");
                });
            });

            describe("Tablet", function () {
                beforeEach(function () {
                    Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19");
                });

                it("Should return the decimalized version 2.3.4 of the android platform", function () {
                    expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("4.0.4");
                });
            });
        });

        describe("BLACKBERRY", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+");
            });

            it("Should return the 9900 for the Blackberry version", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("9900");
            });
        });

        describe("J2ME", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54");
            });

            it("Should return null for j2me", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toBeNull();
            });
        });

        describe("WEB_TV", function () {
            beforeEach(function () {
                Neosavvy.Core.Utils.BrowserUtils.reload("Mozilla/3.0 WebTV/1.2 (compatible; MSIE 2.0)");
            });

            it("Should return the decimalized 1.2 for the web tv", function () {
                expect(Neosavvy.Core.Utils.BrowserUtils.osVersion()).toEqual("1.2");
            });
        });
    });
});