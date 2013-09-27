var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};
Neosavvy.Core.Utils.MapUtils = (function () {
    return {
        get:function (map, properties) {
            if (map && properties) {
                properties = properties.split(".");
                while (properties.length) {
                    if (map) {
                        map = map[properties.shift()];
                    } else {
                        break;
                    }
                }
            }
            return map;
        },
        keysDistinct:function() {
            if (arguments.length > 1) {
                var accumulatedLength = 0;
                for (var i = 0; i < arguments.length; i++) {
                    accumulatedLength += _.keys(arguments[i]).length;
                }
                return (_.keys(_.merge.apply(this, arguments)).length === accumulatedLength);
            }
            return true;
        }
    }
})();