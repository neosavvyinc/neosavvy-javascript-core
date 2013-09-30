var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.StringUtils
 * @static
 **/
Neosavvy.Core.Utils.StringUtils = (function () {
    var BLANK_STRING_REGEX = /^\s*$/;

    return {
        /**
         * Truncates a string to a specified length with optional dots (...)
         * @param {String} str
         * @param {Int) characterCount
         * @param {Boolean} includeDots
         * @returns String
         * @method truncate
         **/
        truncate:function (str, characterCount, includeDots) {
            if (includeDots == undefined) {
                includeDots = true;
            }
            if (str) {
                if (characterCount && str.length > characterCount) {
                    str = str.slice(0, characterCount).trim();
                    if (includeDots) {
                        str += "...";
                    }
                }
            }
            return str;
        },
        /**
         * Tests whether or not a string is blank with no contents. Also works with numbers, unlike _.isEmpty
         * @param {String} str
         * @returns Boolean
         * @method isBlank
         **/
        isBlank:function (str) {
            return (str === undefined || str === null || BLANK_STRING_REGEX.test(str));
        },
        /**
         * Removes the occurrence of any of the followup arguments from the given string.
         * @param {String} value
         * @param {String} arguments
         * @returns String
         * @method remove
         **/
        remove:function (value) {
            if (value && arguments.length > 1) {
                value = String(value);
                for (var i = 1; i < arguments.length; i++) {
                    value = value.replace(new RegExp(String(arguments[i]), "g"), "");
                }
            }
            return value;
        }
    }

})();
