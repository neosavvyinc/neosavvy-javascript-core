/*! neosavvy-core - v0.1.0 - 2013-08-09
* Copyright (c) 2013 Neosavvy, Inc.; Licensed  */
var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};

Neosavvy.Core.Builders.StringBuilder = function (input) {
    //Nothing defined here yet
    if (input) {
        this.input = input;
        this.output = input;
    } else {
        throw "Do not try to build a string with no input, it is pointless.";
    }
};

Neosavvy.Core.Builders.StringBuilder.prototype = {
    camelToDash:function () {
        this.output = this.output.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        return this;
    },
    constantToDash:function () {
        this.output = this.output.replace(/_/g, '-').toLowerCase();
        return this;
    },
    build:function () {
        return this.output;
    }
};
var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.DateUtils = (function () {
    var DAY_IN_MILLISECONDS = (24 * 60 * 60 * 1000);

    return {
        DAY_IN_MILLISECONDS:DAY_IN_MILLISECONDS,
        sameDay:function (dateA, dateB) {
            if (dateA && dateB) {
                if (dateA.getDay() == dateB.getDay()) {
                    return (dateA.getTime() >= (dateB.getTime() - DAY_IN_MILLISECONDS)) && (dateA.getTime() <= (dateB.getTime() + DAY_IN_MILLISECONDS));
                }
            }
            return false
        },
        daysFromNow:function (days) {
            return new Date(new Date().getTime() + (days * (24 * 60 * 60 * 1000)));
        }
    }

})();
var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.DomUtils = (function () {
    return {
        getElementsByAttribute:function (tagName, attr, value) {
            var matchingElements = [];
            var allElements = document.getElementsByTagName(tagName);
            for (var i = 0; i < allElements.length; i++) {
                if (allElements[i].getAttribute(attr) == value) {
                    // Element exists with attribute. Add to array.
                    matchingElements.push(allElements[i]);
                }
            }
            return matchingElements;
        }
    };
})();
var Neosavvy = Neosavvy || {};
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
var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.RequestUrlUtils = (function () {
    function addParam(url, key, value) {
        if (url && url != null && key != null && key != "" && value != null && value != "") {
            var key_value = key.toString() + "=" + value.toString();

            if (url.indexOf("?") == -1) {
                url += "?" + key_value;
            } else {
                url += "&" + key_value;
            }
        }
        return url;
    }

    function getKey(hash) {
        if (hash && hash != null) {
            var ar = Object.keys(hash);

            if (ar != null && ar.length) {
                return ar[0];
            }
        }
        return null;
    }

    return {
        addParams:function (url, key_value_pairs) {
            if (url && url != null && key_value_pairs != null && key_value_pairs.length) {
                for (var i = 0; i < key_value_pairs.length; i++) {
                    var hash = key_value_pairs[i];
                    var key = getKey(hash);
                    url = addParam(url, key, hash[key]);
                }
            }
            return url;
        },

        addParam:function (url, key, value) {
            return addParam(url, key, value);
        },

        replaceParam:function (url, key, value) {
            if (url != null && key != null && value != null) {
                var url_array = url.split("?");
                if (url_array.length == 2) {
                    var found_param = false;

                    var params = url_array[1].split("&");
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].indexOf(key + "=") != -1) {
                            params[i] = key.toString() + "=" + value.toString();
                            found_param = true;
                            break;
                        }
                    }

                    if (found_param) {
                        url = url_array[0] + "?";

                        for (var i = 0; i < params.length; i++) {
                            url += params[i];
                            if (i < (params.length - 1)) {
                                url += "&";
                            }
                        }
                    }
                }
                return url
            }
            return null
        }
    }
})();
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
        }
    }

})();