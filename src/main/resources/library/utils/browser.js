var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
/**
 * @class Neosavvy.Core.Utils.BrowserUtils
 * @static
 **/
Neosavvy.Core.Utils.BrowserUtils = (function () {
    var browser, browserVersion, os, osVersion;

    function _load(userAgent) {
        userAgent = userAgent.toLowerCase();
        var operaBrowserParts = /(opr)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
        var browserParts = /(msie|trident|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
        browser = (operaBrowserParts && operaBrowserParts.length) ? operaBrowserParts[1] : browserParts[1];
        if (browser.indexOf(/msie|trident/g) !== -1) {
            browser = "msie";
        }
        browserVersion = browserParts[2];
        os = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent)[1];
        osVersion = null;
    }

    var _CONSTANTS = {
        PLATFORM: {
            OSX: "mac",
            WINDOWS: "win",
            LINUX: "linux",
            FREE_BSD: "freebsd",
            GENERIC_MOBILE: "mobile",
            IPHONE: "iphone",
            IPOD: "ipod",
            IPAD: "ipad",
            ANDROID: "android",
            BLACKBERRY: "blackberry",
            OPERA_MINI: "j2me",
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

    //is... methods
    var browsersAndPlatforms = _.merge(_CONSTANTS.PLATFORM, _CONSTANTS.BROWSER);
    for (var key in browsersAndPlatforms) {
        var name = key.toLowerCase().replace(/^.|_./g,function (val) {
            return val.toUpperCase();
        }).replace(/_/g, "");
        def['is' + name] = (function (key) {
            return function () {
                return (browser === browsersAndPlatforms[key]);
            }
        })(key);
    }

    //for testing
    if (window.jasmine) {
        def['reload'] = _load;
    }

    return def;
})();

Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};
