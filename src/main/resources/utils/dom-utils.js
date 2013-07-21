var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.Utils.DomUtils = (function () {
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