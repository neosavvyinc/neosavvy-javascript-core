var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};
Neosavvy.Core.Utils.CollectionUtils = (function() {
    return {
        itemByProperty: function (collection, property, value) {
            if (collection && collection.length && value) {
                for (var i = 0; i < collection.length; i++) {
                    var found = Neosavvy.Core.Utils.MapUtils.get(collection[i], property);
                    if (found === value) {
                        return collection[i];
                    }
                }
            }
            return null;
        },
        updateByProperty: function (collection, item, propertyName) {
            if (collection && collection.length && item && item[propertyName] && propertyName) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i] != undefined && collection[i] != null && collection[i][propertyName] === item[propertyName]) {
                        collection[i] = item;
                        break;
                    }
                }
            }
        },
        removeByProperty: function (collection, item, propertyName) {
            if (collection && collection.length && item && item[propertyName] && propertyName) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i] != undefined && collection[i] != null && collection[i][propertyName] === item[propertyName]) {
                        collection.splice(i, 1);
                        break;
                    }
                }
            }
        },
        uniqueMap: function (collection, properties) {
            var map = {};
            if (collection && collection.length) {
                for (var i = 0; i < collection.length; i++) {
                    map[String(Neosavvy.Core.Utils.MapUtils.get(collection[i], properties))] = collection[i];
                }
            }
            return map;
        },
        containsItemByProperty: function (collection, value, propertyName) {
            if (collection && collection.length && value) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i][propertyName] == value) {
                        return true;
                    }
                }
            }
            return false;
        },
        containMatchByProperty: function (collectionA, collectionB, propertyName) {
            if (collectionA && collectionB && collectionA.length && collectionB.length) {
                var compare = collectionB.map(function (item) {
                    return item[propertyName];
                });

                for (var i = 0; i < collectionA.length; i++) {
                    if (compare.indexOf(collectionA[i][propertyName]) != -1) {
                        return true;
                    }
                }
            }
            return false;
        },
        collectionContainsAllOtherItems: function (collection, otherItems, propertyName) {
            if (collection && collection.length && otherItems && otherItems.length) {
                var collectionProperties = collection.map(function (item) {
                    return item[propertyName];
                });

                for (var i = 0; i < otherItems.length; i++) {
                    if (collectionProperties.indexOf(otherItems[i][propertyName]) == -1) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        containsExclusively: function (collection, compare) {
            if (collection && compare) {
                for (var i = 0; i < collection.length; i++) {
                    if (compare.indexOf(collection[i]) === -1) {
                        return false;
                    }
                }
                for (var i = 0; i < compare.length; i++) {
                    if (collection.indexOf(compare[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
    };
})();