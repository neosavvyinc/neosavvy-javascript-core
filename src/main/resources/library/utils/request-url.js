var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.RequestUrlUtils
 * @static
 **/
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
