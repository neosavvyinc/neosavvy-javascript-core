var _ns = _ns || {};
_ns.Core = _ns.Core || {};
/**
 * @class _ns.Core.Utils.BrowserUtils
 * @static
 **/
_ns.Core.Utils.BrowserUtils = (function () {
    var browser, browserVersion, os, osVersion;

    function _load(userAgent) {
        /* Reset */
        browser = browserVersion = os = osVersion = null;

        /* Evaluate */
        userAgent = userAgent.toLowerCase();

        /* Browser, Browser Version */
        try {
            var operaBrowserParts = /(opr|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
            var browserParts = /(msie|trident|firefox|chrome|safari)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
            browser = (operaBrowserParts && operaBrowserParts.length) ? operaBrowserParts[1] : browserParts[1];
            if (browser === "trident") {
                browser = _CONSTANTS.BROWSER.INTERNET_EXPLORER;

                var tridentVersion = String(parseFloat(browserParts[2]) + 4.0);
                browserVersion = tridentVersion.length === 2 ? tridentVersion + ".0" : tridentVersion;
            } else if (browser === "opera" || browser === "opr") {
                browser = "opr";
                browserVersion = operaBrowserParts[2];
            } else if (browser === "safari" && userAgent.indexOf("phantomjs") === -1) {
                /* Chrome For iOS case */
                if (userAgent.indexOf('crios') !== -1) {
                    browser = _CONSTANTS.BROWSER.CHROME;
                    browserVersion = /(crios\/)((\d|\.)*)/g.exec(userAgent)[2];
                }
                /* Normal safari case */
                else {
                    browserVersion = /(version)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent)[2];
                }
            } else {
                browserVersion = browserParts[2];
            }
        } catch (e) {
            console.warn("Trouble getting the browser or browser version, check the code or report a bug with the userAgent listed.");
        }

        /* OS */
        try {
            var androidOs = /(android)/.exec(userAgent);
            os = (androidOs && androidOs.length) ? 'android' : /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent)[1];
        } catch (e) {
            console.warn("Trouble getting the os, check the code or report a bug with the userAgent listed.");
        }

        /* OS Version */
        try {
            switch (os) {
                case _CONSTANTS.OS.OSX:
                case _CONSTANTS.OS.IPHONE:
                case _CONSTANTS.OS.IPAD:
                case _CONSTANTS.OS.WINDOWS:
                case _CONSTANTS.OS.ANDROID:
                case _CONSTANTS.OS.BLACKBERRY:
                case _CONSTANTS.OS.WEB_TV:
                    osVersion = /(mac\sos\sx\s|iphone os\s|ipad;\scpu\sos\s|windows nt\s|android\s|blackberry\s|webtv\/)((\d|\.|_)*)/.exec(userAgent)[2].replace(/_/g, ".");
                    break;
                default:
                    osVersion = null;
            }
        } catch (error) {
            console.warn("Trouble getting the os version, check the code or report a bug with the userAgent listed.");
        }
    }

    var _CONSTANTS = {
        OS: {
            OSX: "mac",
            WINDOWS: "win",
            LINUX: "linux",
            FREE_BSD: "freebsd",
            IPHONE: "iphone",
            IPOD: "ipod",
            IPAD: "ipad",
            ANDROID: "android",
            BLACKBERRY: "blackberry",
            J2ME: "j2me",
            WEB_TV: "webtv"
        },
        BROWSER: {
            INTERNET_EXPLORER: "msie",
            FIREFOX: "firefox",
            CHROME: "chrome",
            SAFARI: "safari",
            OPERA: "opr"
        }
    };

    function _info() {
        return {
            browser: browser,
            browserVersion: browserVersion,
            os: os,
            osVersion: osVersion
        }
    }

    //Load Library
    _load(window.navigator.userAgent);

    //Base Definitions
    var def = {
        CONSTANTS: _CONSTANTS,
        info: _info
    };

    //browser, browserVersion, os, osVersion methods
    for (var key in _info()) {
        def[key] = (function (key) {
            return function () {
                return _info()[key];
            }
        })(key);
    }

    function _nameFromKey(key) {
        return key.toLowerCase().replace(/^.|_./g,function (val) {
            return val.toUpperCase();
        }).replace(/_/g, "");
    }

    //is... methods
    for (var key in _CONSTANTS.BROWSER) {
        def['is' + _nameFromKey(key)] = (function (key) {
            return function () {
                return (browser === _CONSTANTS.BROWSER[key]);
            }
        })(key);
    }
    for (var key in _CONSTANTS.OS) {
        def['is' + _nameFromKey(key)] = (function (key) {
            return function () {
                return (os === _CONSTANTS.OS[key]);
            }
        })(key);
    }

    //for testing
    if (window.jasmine) {
        def['reload'] = _load;
    }

    return def;
})();

_ns.Core.Utils = _ns.Core.Utils || {};
