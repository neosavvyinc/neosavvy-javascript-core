var _ns = _ns || {};
_ns.Core = _ns.Core || {};
_ns.Core.Utils = _ns.Core.Utils || {};

/**
 * @class _ns.Core.Utils.RegexUtils
 * @static
 **/
_ns.Core.Utils.RegexUtils = (function () {
    var EMAIL_REGEX = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return {
        matchStringAndLeadup: function(str) {
            if (!_.isEmpty(str)) {
                str = String(str);
                var re = "", idx = 0;
                while (idx < str.length) {
                    re += "^" + str.slice(0, idx + 1) + "$";
                    if (idx < (str.length - 1)) {
                        re += "|";
                    }
                    idx++;
                }
                return new RegExp(re.replace(/([.?*+[\]\\(){}-])/g, "\\$1"), "i");
            }
            return undefined;
        },
        isEmail: function(str) {
            if (str !== undefined && str !== null) {
                return String(str).search(EMAIL_REGEX) != -1;
            }
            return false;
        }
    };
})();
