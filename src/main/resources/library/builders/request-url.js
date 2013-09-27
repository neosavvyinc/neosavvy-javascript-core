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
    this.keyValues = {};
    this.replacements = {};
    this.baseUrl = baseUrl;
};
Neosavvy.Core.Builders.RequestUrlBuilder.prototype.addParam = function(key, value) {
    if (typeof(key) === 'object') {
        if (Neosavvy.Core.Utils.MapUtils.keysDistinct(this.keyValues, key)) {
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
};
Neosavvy.Core.Builders.RequestUrlBuilder.prototype.paramReplace = function(key, value) {
    if (typeof(key) === 'object') {
        if (Neosavvy.Core.Utils.MapUtils.keysDistinct(this.replacements, key)) {
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
};
Neosavvy.Core.Builders.RequestUrlBuilder.prototype.build = function() {
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
};