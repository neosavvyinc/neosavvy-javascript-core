var ns = ns || {};

/**
 * @class ns.RequestUrlBuilder
 * @constructor
 **/
ns.RequestUrlBuilder = function (baseUrl) {
    if (!baseUrl) {
        throw "You must provide a base url for every request url built.";
    }
    this.keyValues = {};
    this.replacements = {};
    this.baseUrl = baseUrl;
};
ns.RequestUrlBuilder.prototype = {
    /**
     * Adds a url parameter style param (key=value) to the url being built. Pass in either a key value pair, or an object with one or many key values.
     * @param {String|Object} key
     * @param {String} value
     * @returns ns.RequestUrlBuilder
     * @method addParam
     **/
    addParam: function (key, value) {
        if (typeof(key) === 'object') {
            if (ns.MapUtils.keysDistinct(this.keyValues, key)) {
                this.keyValues = _.merge(this.keyValues, key);
            } else {
                throw "You have passed overlapping keys for object arguments."
            }
        } else if (key && value) {
            this.keyValues = this.keyValues || {};
            if (this.keyValues[key] === undefined) {
                this.keyValues[key] = value;
            } else {
                throw "You have attempted to overwrite an existing key value in the request url.";
            }
        }
        else {
            throw "You must provide either a keyValue object, or a key value as arguments.";
        }
        return this;
    },
    /**
     * Replaces a key in the url with the value specified. Pass in a key value pair as separate arguments or an object with one or many key value pairs defined.
     * @param {String|Object} key
     * @param {String} value
     * @returns ns.RequestUrlBuilder
     * @method paramReplace
     **/
    paramReplace: function (key, value) {
        if (typeof(key) === 'object') {
            if (ns.MapUtils.keysDistinct(this.replacements, key)) {
                this.replacements = _.merge(this.replacements, key);
            } else {
                throw "You have passed overlapping keys for object arguments."
            }
        } else if (key && value) {
            this.replacements = this.replacements || {};
            if (this.replacements[key] === undefined) {
                this.replacements[key] = value;
            } else {
                throw "You have attempted to overwrite an existing key value in the request url.";
            }
        }
        else {
            throw "You must provide either a keyValue object, or a key value as arguments.";
        }
        return this;
    },
    /**
     * Runs all the operations specified and generates the appropriate request url output.
     * @returns String
     * @method build
     **/
    build: function () {
        if (this.replacements) {
            for (var key in this.replacements) {
                this.baseUrl = this.baseUrl.replace(new RegExp(key, "g"), String(this.replacements[key]))
            }
        }
        if (this.keyValues) {
            var count = 0;
            for (var key in this.keyValues) {
                if (count === 0) {
                    this.baseUrl += "?";
                } else {
                    this.baseUrl += "&";
                }
                this.baseUrl += key + "=" + String(this.keyValues[key]);
                count++;
            }
        }
        return this.baseUrl;
    }
};
