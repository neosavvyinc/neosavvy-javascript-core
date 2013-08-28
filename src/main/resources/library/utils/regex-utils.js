var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.RegexUtils = (function () {
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
        }
    };
})();