describe("_ns.CollectionBuilder", function () {
    it("Should set the collection to the given base param", function () {
        expect(new _ns.CollectionBuilder([1, 2, 3]).collection).toEqual([1, 2, 3]);
    });

    it("Should be fine with an empty collection", function () {
        expect(new _ns.CollectionBuilder([]).collection).toEqual([]);
    });

    it("Should define an empty operations object", function () {
        expect(new _ns.CollectionBuilder([1, 2, 3]).operations).toEqual({});
    });

    it("Should throw an error if the initial argument is undefined", function () {
        expect(function () {
            new _ns.CollectionBuilder();
        }).toThrow();
    });

    describe("prototype", function () {

        describe("nest", function () {
            it("Should be able to the set the operations.nest to the propertyString passed in", function () {
                var builder = new _ns.CollectionBuilder([1, 2, 3]);
                builder.nest("hello.world");
                expect(builder.operations.nest).toEqual("hello.world");
            });

            it("Should throw an error with an empty propertyString", function () {
                expect(function () {
                    new _ns.CollectionBuilder([1, 2, 3]).nest("")
                }).toThrow();
            });

            it("Should return the builder itself", function () {
                var builder = new _ns.CollectionBuilder([1, 2, 3]);
                expect(builder.nest("hello.world")).toEqual(builder);
            });

            it("Should be able to return a new nested collection for a single property", function () {
                expect(new _ns.CollectionBuilder([1, 2, 3]).nest("town").build()).
                    toEqual([{town: 1}, {town: 2}, {town: 3}]);
            });

            it("Should be able to return a new nested collection for multiple properties", function () {
                expect(new _ns.CollectionBuilder([1, 2, 3]).nest("state.town.municipality").build()).
                    toEqual([{state: {town: {municipality: 1}}}, {state: {town: {municipality: 2}}}, {state: {town: {municipality: 3}}}]);
            });
        });

        describe("build", function () {
            it("Should return the base collection if no operations are specified", function () {
                expect(new _ns.CollectionBuilder([1, 2, 3]).build()).toEqual([1, 2, 3]);
            });
        });
    });
});