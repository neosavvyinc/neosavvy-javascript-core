describe("Neosavvy.Core.Utils.FunctionalUtils", function () {

    describe("tryCall", function () {
        var _hpGet = Neosavvy.Core.Utils.MapUtils.highPerformanceGet;
        var _tryCall = Neosavvy.Core.Utils.FunctionalUtils.tryCall;

        it("Should return undefined if there is no object in question", function () {
            expect(_tryCall(undefined, 'join')).toBeUndefined();
        });

        it("Should return undefined if the function is not available on the object", function () {
            expect(_tryCall({name: 'Mike'}, 'age', [true])).toBeUndefined();
        });

        it("Should return the elseCase if it is defined and the function is not", function () {
            expect(_tryCall({name: 'Mike'}, 'age', [false], 50)).toEqual(50);
        });

        it("Should be good to call a nested function on an object", function () {
            var myObj = {name: {first: function (param) {
                return param;
            }}};
            expect(_tryCall(myObj.name, 'first', ['Mike'])).toEqual('Mike');
        });

        it("Should play nice with native js objects", function () {
            expect(_tryCall(['Mike', 'Tony', 'Terri'], 'join', ['_'])).toEqual('Mike_Tony_Terri');
        });

        it("Should play nice with nested objects", function () {
            expect(_tryCall(_hpGet({name: {first: 'Sonny'}}, 'name.first'), 'indexOf', ['o'])).toEqual(1);
        });

        it("Should not worry about the arguments if not passed", function () {
            expect(_tryCall(_hpGet({name: {first: 50}}, 'name.first'), 'toString')).toEqual('50');
        });

        it("Should use all the arguments passed", function () {
            expect(_tryCall(_hpGet({name: {first: "Charlie"}}, 'name.first'), 'replace', ['lie', 'lie\'s Angels'])).toEqual('Charlie\'s Angels');
        });

    });

});