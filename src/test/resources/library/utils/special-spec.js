describe("_ns.SpecialUtils", function () {

    describe("keepTrying", function () {
        it("Should return null when called with no arguments", function () {
            expect(_ns.SpecialUtils.keepTrying()).toBeNull();
        });

        it("Should throw an error when called with an odd number of arguments", function () {
            expect(function () {
                _ns.SpecialUtils.keepTrying(function () {
                }, [], function () {
                });
            }).toThrow();
        });

        it("Should return the value of the first function in the list if it does not throw an error", function () {
            expect(_ns.SpecialUtils.keepTrying(
                function () {
                    return 6;
                }, [], function () {
                    throw "Some error!";
                }, [])
            ).toEqual(6);
        });

        it("Should return the value of the second function in the list if the first throws an error", function () {
            expect(_ns.SpecialUtils.keepTrying(
                function () {
                    throw "Some error!";
                }, [88], function () {
                    return arguments[0];
                }, [77])
            ).toEqual(77);
        });

        it("Should return the value of n function in the list if 0 >> n - 1 throw errors", function () {
            expect(_ns.SpecialUtils.keepTrying(
                function () {
                    throw "Some error!";
                }, [88],
                function () {
                    throw "Some error!";
                }, [98],
                function () {
                    throw "Some error!";
                }, [108],
                function () {
                    throw "Some error!";
                }, [188],
                function () {
                    throw "Some error!";
                }, [1188],
                function () {
                    return arguments[0];
                }, [42])
            ).toEqual(42);
        });
    });

});