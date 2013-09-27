var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};

/**
 * @class Neosavvy.Core.Builders.StringBuilder
 * @constructor
 **/
Neosavvy.Core.Builders.StringBuilder = function (input) {
    //Nothing defined here yet
    if (input) {
        this.input = input;
        this.output = input;
    } else {
        throw "Do not try to build a string with no input, it is pointless.";
    }
};

Neosavvy.Core.Builders.StringBuilder.prototype = {
    /**
     * does a thing...
     * @param {type} name
     * @returns type
     * @method camelToDash
     **/
    camelToDash:function () {
        this.output = this.output.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        return this;
    },
    /**
     * does a thing...
     * @param {type} name
     * @returns type
     * @method constantToDash
     **/
    constantToDash:function () {
        this.output = this.output.replace(/_/g, '-').toLowerCase();
        return this;
    },
    /**
     * does a thing...
     * @param {type} name
     * @returns type
     * @method build
     **/
    build:function () {
        return this.output;
    }
};
