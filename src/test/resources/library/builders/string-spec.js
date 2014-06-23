describe("_ns.StringBuilder", function () {

    it("Should throw an error if the input is undefined", function () {
        expect(function () {
            new _ns.StringBuilder(undefined);
        }).toThrow();
    });

    it("Should throw an error if the input is null", function () {
        expect(function () {
            new _ns.StringBuilder(null);
        }).toThrow();
    });

    it("Should throw an error if the input is a blank string", function () {
        expect(function () {
            new _ns.StringBuilder("");
        }).toThrow();
    });

    it("Should set the value if input and output to the input value when constructed", function () {
        var builder = new _ns.StringBuilder("Mike 500");
        expect(builder.input).toEqual("Mike 500");
        expect(builder.output).toEqual("Mike 500");
    });

    describe("prototype", function () {

        describe("camelToDash", function () {
            it("Should be able to output a camel case string as lower case dash", function () {
                expect(new _ns.StringBuilder("myHighScoreTime").
                    camelToDash().
                    output).toEqual("my-high-score-time");
            });

            it("Should play nice with an uppercase dashed string", function () {
                expect(new _ns.StringBuilder("Something-I-LearnedToday").
                    camelToDash().
                    output).toEqual("something-i-learned-today");
            });

            it("Should do nothing to a lower case dashed string", function () {
                expect(new _ns.StringBuilder("an-html-element").
                    camelToDash().
                    output).toEqual("an-html-element");
            });
        });

        describe("constantToDash", function () {
            it("Should be able to change a string in the constant format to a dashed string", function () {
                expect(new _ns.StringBuilder("IN_THEATERS_TODAY").
                    constantToDash().
                    output).toEqual("in-theaters-today");
            });

            it("Should play nice with a lower case underscored string", function () {
                expect(new _ns.StringBuilder("in_theaters_tomorrow-NIght").
                    constantToDash().
                    output).toEqual("in-theaters-tomorrow-night");
            });

            it("Should not change strings that are already in a dashed format", function () {
                expect(new _ns.StringBuilder("my-other-html-element").
                    constantToDash().
                    output).toEqual("my-other-html-element");
            });
        });

        describe("properCase", function () {
            it("Should change the casing for an improperly formatted string casing", function () {
                expect(new _ns.StringBuilder("an improper Casing dude!").properCase().output).toEqual("An Improper Casing Dude!");
            });

            it("Should correct an all uppercase string", function () {
                expect(new _ns.StringBuilder("HELLO DUDE").properCase().output).toEqual("Hello Dude");
            });
        });

        describe("build", function () {
            it("Should be able to string methods for different kinds of strings", function () {
                //Notice order must be preserved
                expect(new _ns.StringBuilder("camelCasedVars_thatBehave_LikeConstants").
                    camelToDash().
                    constantToDash().build()).toEqual("camel-cased-vars-that-behave-like-constants");
            });
        });
    });

});

