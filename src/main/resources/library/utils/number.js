var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.NumberUtils
 * @static
 **/
Neosavvy.Core.Utils.NumberUtils = (function () {

    return {
        asOrdinal:function (n) {
            var s = ["th", "st", "nd", "rd"], v = Math.abs(n) % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        },
        round:function (value, significantDigits) {
            if (value !== undefined && value !== null) {
                var str = String(Math.round(parseFloat(value) * Math.pow(10, significantDigits)));
                return significantDigits ? str.slice(0, str.length - significantDigits) + "." + str.slice(str.length - significantDigits, str.length) : str;
            }
            return value;
        },
        roundUpIfFloat:function (n) {
            var absN = Math.abs(n);
            if ((absN - parseInt(absN)) > 0) {
                return parseInt(n) + (n < 0 ? -1 : 1);
            }
            return n;
        },
        leadingZeroes:function (n, digits) {
            if (n != undefined && n != null) {
                if (digits == undefined || digits == null) {
                    digits = 2;
                }
                var s = String(n);
                var negative = (s.charAt(0) == "-");
                if (negative) {
                    s = s.slice(1);
                }
                var split = s.split(".");
                if (split.length == 2) {
                    s = split[0];
                }
                while (s.length < digits) {
                    s = "0" + s;
                }
                if (split.length == 2) {
                    s += "." + split[1];
                }
                return negative ? "-" + s : s;
            }
            return n;
        }
    }

})();
