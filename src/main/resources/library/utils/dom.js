var _ns = _ns || {};

/**
 * @class DomUtils
 * @static
 **/
var DomUtils = (function () {
    return {
        /**
         * returns an array of DOM elements that contain the passed
         * in attribute matching value
         * @param {string} tagName
         * @param {string} attr
         * @param {string} value
         * @returns array
         * @method getElementsByAttribute
         **/
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

_.merge(_ns, DomUtils);

//For backward compatibility
_ns.DomUtils = DomUtils;