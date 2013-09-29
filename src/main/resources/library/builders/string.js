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
     * Converts any camel case in a string to dash case: myNameMike >> my-name-mike.
     * @returns Neosavvy.Core.Builders.StringBuilder
     * @method camelToDash
     **/
    camelToDash:function () {
        this.output = this.output.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        return this;
    },
    /**
     * Changes a standard constant syntax to standard dash syntax: MY_NAME_MIKE >> my-name-mike.
     * @returns Neosavvy.Core.Builders.StringBuilder
     * @method constantToDash
     **/
    constantToDash:function () {
        this.output = this.output.replace(/_/g, '-').toLowerCase();
        return this;
    },
    /**
     * Rusn all the operations specified for the builder.
     * @returns String
     * @method build
     **/
    build:function () {
        return this.output;
    }
};
