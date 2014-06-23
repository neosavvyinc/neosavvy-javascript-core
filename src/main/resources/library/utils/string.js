var _ns = _ns || {};
_ns.Core = _ns.Core || {};
_ns.Core.Utils = _ns.Core.Utils || {};

/**
 * @class _ns.Core.Utils.StringUtils
 * @static
 **/
_ns.Core.Utils.StringUtils = (function () {
    var BLANK_STRING_REGEX = /^\s*$/;

    return {
        /** truncate method deprecated, use _.truncate instead **/
        /** remove method deprecated, use .replace(GLOBAL_REGEX, "") instead **/
        /**
         * Tests whether or not a string is blank with no contents. Also works with numbers, unlike _.isEmpty
         * @param {String} str
         * @returns Boolean
         * @method isBlank
         **/
        isBlank:function (str) {
            return (str === undefined || str === null || BLANK_STRING_REGEX.test(str));
        }
    }
})();
