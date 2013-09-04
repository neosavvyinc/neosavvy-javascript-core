describe("Neosavvy.Core.Utils.CollectionUtils", function () {
    describe("itemByProperty", function () {
        it("Should return null in the case of a null or empty collection or value", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty(null, "name", "Mike")).toBeNull();
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty([], "age", 5)).toBeNull();
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty(["Howard"], null, null)).toBeNull();
        });

        it("Should return the item that matches if no property name is provided", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty(["John", 5, "Lemon"], null, "John")).toEqual("John");
        });

        it("Should play nice with single properties", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty([
                {id: 5},
                {id: 7}
            ], "id", 7)).toEqual({id: 7});
        });

        it("Should play nice with dot properties", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty([
                {name: {first: "Horton"}},
                {name: {first: "Charles"}}
            ], "name.first", "Charles")).toEqual({name: {first: "Charles"}});
        });

        it("Should return null if there is no match", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty([
                {name: {first: "Horton"}},
                {name: {first: "Charles"}}
            ], "name.first", "Charle")).toBeNull();
        });

        it("Should return null if there is no match without a property", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.itemByProperty(["John", 5, "Lemon"], null, "6")).toBeNull();
        });
    });

    describe("updateByProperty", function () {
        it("Should do nothing with a null or empty collection", function () {
            var collection = null;
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toBeNull();
            collection = [];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toEqual([]);
        });

        it("Should do nothing with a null item", function () {
            var collection = [
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, null, "name");
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should do nothing with a null propertyName", function () {
            var collection = [
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Kyle"}, null);
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should update the first item found by property", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Mike", color: "Puce"},
                {name: "Smitty"},
                {name: "Mike"}
            ]);
        });

        it("Should be able to handle nulls in a list", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                null
            ];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Mike", color: "Puce"},
                {name: "Smitty"},
                null
            ]);
        });

        it("Should be able to handle undefineds in a list", function () {
            var collection = [undefined, {name: "Smitty"}, null];
            Neosavvy.Core.Utils.CollectionUtils.updateByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([undefined, {name: "Smitty"}, null]);
        });
    });

    describe("removeByProperty", function () {
        it("Should do nothing with a null or empty collection", function () {
            var collection = null;
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toBeNull();
            collection = [];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Tom"}, "name")
            expect(collection).toEqual([]);
        });

        it("Should do nothing with a null item", function () {
            var collection = [
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, null, "name");
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should do nothing with a null propertyName", function () {
            var collection = [
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Kyle"}, null);
            expect(collection).toEqual([
                {name: "Mike"}
            ]);
        });

        it("Should update the first item found by property", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                {name: "Mike"}
            ];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Smitty"},
                {name: "Mike"}
            ]);
        });

        it("Should be able to handle nulls in a list", function () {
            var collection = [
                {name: "Mike"},
                {name: "Smitty"},
                null
            ];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([
                {name: "Smitty"},
                null
            ]);
        });

        it("Should be able to handle undefineds in a list", function () {
            var collection = [undefined, {name: "Smitty"}, null];
            Neosavvy.Core.Utils.CollectionUtils.removeByProperty(collection, {name: "Mike", color: "Puce"}, "name");
            expect(collection).toEqual([undefined, {name: "Smitty"}, null]);
        });

        describe("containsExclusively", function () {
            it("Should return false if either the collection or compare are null", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively(undefined, undefined)).toBeFalsy();
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively(null, undefined)).toBeFalsy();
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively(undefined, null)).toBeFalsy();
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively([], null)).toBeFalsy();
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively(null, [])).toBeFalsy();
            });

            it("Should return true if they are both empty", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively([], [])).toBeTruthy();
            });

            it("Should not worry about order", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively([4, 5, 6], [6, 4, 5])).toBeTruthy();
            });

            it("Should play nice in the case order is okay", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively(["Mike", "Tom", 0], ["Mike", "Tom", 0])).toBeTruthy();
            });

            it("Should return false for comparison sets that are included but not exclusive", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively([1, "Tom", 6], [1, "Tom"])).toBeFalsy();
            });

            it("Should worry about types", function () {
                expect(Neosavvy.Core.Utils.CollectionUtils.containsExclusively([5, 6], [6, "5"])).toBeFalsy();
            });
        });
    });


    describe("uniqueMap", function () {
        it("Should return an empty map if the collection is null, undefined or empty", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.uniqueMap(undefined)).toEqual({});
            expect(Neosavvy.Core.Utils.CollectionUtils.uniqueMap(null)).toEqual({});
            expect(Neosavvy.Core.Utils.CollectionUtils.uniqueMap([])).toEqual({});
        });

        it("Should play nice with no properties", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.uniqueMap(["Trevor", "Mike", "Howard"])).toEqual({Trevor: "Trevor", Mike: "Mike", Howard: "Howard"});
        });

        it("Should play nice with dot properties", function () {
            expect(Neosavvy.Core.Utils.CollectionUtils.uniqueMap([
                {name: {first: "Charles", last: "Evans"}}
            ], "name.last")).toEqual({Evans: {name: {first: "Charles", last: "Evans"}}});
        });
    });
});