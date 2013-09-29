var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};

/**
 * @class Neosavvy.Core.Builders.Collection
 * @constructor
 **/
Neosavvy.Core.Builders.CollectionBuilder = function (collection) {
    if (collection) {
        this.operations = {};
        this.collection = collection;
    } else {
        throw "You must pass in a collection as the base upon which to build!";
    }
};
Neosavvy.Core.Builders.CollectionBuilder.prototype = {
    /**
     * Operates on the collection to nest each item down to the level of the property string specified
     * @param {String} propertyString
     * @returns Neosavvy.Core.Builders.Collection
     * @method nest
     **/
    nest: function (propertyString) {
        if (!_.isEmpty(propertyString)) {
            this.operations.nest = propertyString;
        } else {
            throw "You must pass a valid propertyString to nest a collection.";
        }
        return this;
    },
    /**
     * Returns the output of all the operations on the builder. If none specified, returns the base collection.
     * @returns Array
     * @method build
     **/
    build: function () {
        if (_.keys(this.operations).length) {
            //Nest
            var nest = function (item, propertyString) {
                var ar = propertyString.split(".");
                while (ar.length) {
                    var tempObj = {};
                    tempObj[ar.pop()] = item;
                    item = tempObj;
                }
                return item;
            };
            return _.map(this.collection, function (item) {
                if (this.operations.nest) {
                    item = nest(item, this.operations.nest);
                }
                return item;
            }, this);
        }
        return this.collection;
    }
};