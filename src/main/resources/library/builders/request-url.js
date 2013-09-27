var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};

/**
 * @class Neosavvy.Core.Utils.RequestUrlBuilder
 * @constructor
 **/
Neosavvy.Core.Builders.RequestUrlBuilder = function(baseUrl) {
    if (!baseUrl) {
        throw "You must provide a base url for every request url built.";
    }

    /**
     * does a thing...
     * @param {type} name
     * @returns type
     * @method addParam
     **/
    this.prototype.addParam = function(key, value) {
        return this;
    };

    /**
     * does a thing...
     * @param {type} name
     * @returns type
     * @method build
     **/
    this.prototype.build = function() {
        return baseUrl;
    };
};
