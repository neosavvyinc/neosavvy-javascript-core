var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.StringUtils = (function () {
    var BLANK_STRING_REGEX = /^\s*$/;

    return {
        //Deals with 5 character gaps at the largest
        htmlAttributeSafe:function (str) {
            if (str != null) {
                var largest_gap = "     ";
                while (largest_gap != " ") {
                    str = str.replace(largest_gap, " ");
                    largest_gap = largest_gap.slice(0, largest_gap.length - 1);
                }

                return str.replace(/(_\s|\s_|\s)/g, "_").
                    replace(/([^a-zA-Z0-9_])/g, "").
                    toLowerCase();
            }
            return null;
        },

        truncate:function (str, character_count, include_dots) {
            if (include_dots == undefined) {
                include_dots = true;
            }
            if (str && str != null) {
                if (str.length > character_count) {
                    str = str.slice(0, character_count).trim();
                    if (include_dots) {
                        str += "...";
                    }
                }
            }
            return str;
        },

        isBlank:function (str) {
            return (!str || BLANK_STRING_REGEX.test(str));
        },
        replaceIfExistsAtIndex:function (str, character, replacement, index) {
            if (str && character != undefined && character != null && replacement != undefined && replacement != null && index >= 0) {
                if (str[index] == character) {
                    return str.substr(0, index) + replacement + str.substr(index + replacement.length + 1);
                }
            }
            return str;
        },
        properCase:function (str) {
            if (str) {
                return str.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
            return "";
        },
        remove:function (value) {
            if (value && arguments.length > 1) {
                value = String(value);
                for (var i = 1; i < arguments.length; i++) {
                    value = value.replace(new RegExp(arguments[i], "g"), "");
                }
            }
            return value;
        }
    }

})();