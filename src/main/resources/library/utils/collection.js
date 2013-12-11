var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.CollectionUtils
 * @static
 **/
Neosavvy.Core.Utils.CollectionUtils = (function () {
    return {
        /**
         * does a thing...
         * @param {type} name
         * @returns type
         * @method itemByProperty
         **/
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
        /**
         * does a thing...
         * @param {type} name
         * @returns type
         * @method updateByProperty
         **/
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
        /**
         * does a thing...
         * @param {type} name
         * @returns type
         * @method removeByProperty
         **/
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
        /**
         * does a thing...
         * @param {type} name
         * @returns type
         * @method uniqueMap
         **/
        uniqueMap: function (collection, properties) {
            var map = {};
            if (collection && collection.length) {
                for (var i = 0; i < collection.length; i++) {
                    map[String(Neosavvy.Core.Utils.MapUtils.get(collection[i], properties))] = collection[i];
                }
            }
            return map;
        },
        /**
         * Returns true if two collections contain at least one match by a property value, ie a.id === b.id.
         * @param {Array} collectionA
         * @param {Array} collectionB
         * @param {String} propertyName
         * @returns Boolean
         * @method containMatchByProperty
         **/
        containMatchByProperty: function (collectionA, collectionB, propertyName) {
            if (collectionA && collectionB && collectionA.length && collectionB.length) {
                var compare = collectionB.map(function (item) {
                    return Neosavvy.Core.Utils.MapUtils.get(item, propertyName);
                });

                var item;
                for (var i = 0; i < collectionA.length; i++) {
                    item = Neosavvy.Core.Utils.MapUtils.get(collectionA[i], propertyName);
                    if (item !== undefined &&
                        compare.indexOf(item) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * Matches the containing of an exclusive set of items by property. Supports deep properties as well.
         * @param {Array} collection
         * @param {Array} otherItems
         * @param {String} propertyName
         * @returns Boolean
         * @method collectionContainsAllOtherItems
         **/
        collectionContainsAllOtherItems: function (collection, otherItems, propertyName) {
            if (collection && collection.length && otherItems && otherItems.length) {
                var collectionProperties = collection.map(function (item) {
                    return Neosavvy.Core.Utils.MapUtils.get(item, propertyName);
                });

                var item;
                for (var i = 0; i < otherItems.length; i++) {
                    item = typeof otherItems[i] === 'object' ? Neosavvy.Core.Utils.MapUtils.get(otherItems[i], propertyName) : undefined;
                    if (item === undefined && collectionProperties.indexOf(item) === -1) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        /**
         * Returns true for an exclusive contents but not order match of collections.
         * @param {Array} collection
         * @param {Array} compare
         * @returns Boolean
         * @method containsExclusively
         **/
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
        },
        /**
         * ???
         **/
        flatConcat: function () {
            var head = _.head(arguments);
                tail = _.tail(arguments);

            if (Neosavvy.Core.Utils.Validation.existy(head))
                return head.concat.apply(head, tail);
            else
                return [];
        },
        /**
         * apply fn (which should take a value and return an array) to each member 
         * of collection and flatten the resulting array
         **/
        flatMapConcat: function (fn, collection) {
            return Neosavvy.Core.Utils.CollectionUtils.flatConcat.apply(null, _.map(collection, fn));
        }
    };
})();
