Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.NumberUtils = (function () {

    return {
        toOrdinal:function (n) {
            var s = ["th", "st", "nd", "rd"], v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        },
        roundUpIfFloat:function (n) {
            if ((n - parseInt(n)) > 0) {
                return parseInt(n) + 1;
            }
            return n;
        }
    }

})();