var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};
Neosavvy.Core.Builders.RequestUrlBuilder = function(baseUrl) {
    this.prototype.addParam = function(key, value) {
        return this;
    };
    this.prototype.build = function() {
        return baseUrl;
    };
};