var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Builders = Neosavvy.Core.Builders || {};

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
    camelToDash:function () {
        this.output = this.output.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
        return this;
    },
    constantToDash:function () {
        this.output = this.output.replace(/_/g, '-').toLowerCase();
        return this;
    },
    build:function () {
        return this.output;
    }
};