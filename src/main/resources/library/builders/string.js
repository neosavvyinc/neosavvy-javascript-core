var _ns = _ns || {};
_ns.Core = _ns.Core || {};
_ns.Core.Builders = _ns.Core.Builders || {};

/**
 * @class _ns.Core.Builders.StringBuilder
 * @constructor
 **/
_ns.Core.Builders.StringBuilder = function (input) {
    //Nothing defined here yet
    if (input) {
        this.input = input;
        this.output = input;
    } else {
        throw "Do not try to build a string with no input, it is pointless.";
    }
};

_ns.Core.Builders.StringBuilder.prototype = {
    /**
     * Converts any camel case in a string to dash case: myNameMike >> my-name-mike.
     * @returns _ns.Core.Builders.StringBuilder
     * @method camelToDash
     **/
    camelToDash: function () {
        this.output = this.output.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        return this;
    },
    /**
     * Changes a standard constant syntax to standard dash syntax: MY_NAME_MIKE >> my-name-mike.
     * @returns _ns.Core.Builders.StringBuilder
     * @method constantToDash
     **/
    constantToDash: function () {
        this.output = this.output.replace(/_/g, '-').toLowerCase();
        return this;
    },
    /**
     * Changes the string to proper case, first letters of words capitalized.
     * @returns _ns.Core.Builders.StringBuilder
     * @method properCase
     **/
    properCase: function () {
        this.output = this.output.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        return this;
    },
    /**
     * Runs all the operations specified for the builder.
     * @returns String
     * @method build
     **/
    build: function () {
        return this.output;
    }
};