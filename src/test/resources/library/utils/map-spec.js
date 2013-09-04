describe("Neosavvy.Core.Utils.MapUtils", function () {
    describe("get", function () {
        describe("get", function () {
            it("Should return null or undefined respectively if the map is so", function () {
                expect(Neosavvy.Core.Utils.MapUtils.get(undefined, "name")).toBeUndefined();
                expect(Neosavvy.Core.Utils.MapUtils.get(null, "name")).toBeNull();
            });

            it("Should return the map itself if the properties are not provided", function () {
                expect(Neosavvy.Core.Utils.MapUtils.get({name: "Charlie"}, null)).toEqual({name: "Charlie"});
            });

            it("Should play nice with single properties", function () {
                expect(Neosavvy.Core.Utils.MapUtils.get({name: "Charlie"}, "name")).toEqual("Charlie");
                expect(Neosavvy.Core.Utils.MapUtils.get({name: "Charlie", number: 7}, "number")).toEqual(7);
            });

            it("Should play nice with dot properties", function () {
                expect(Neosavvy.Core.Utils.MapUtils.get({name: {first: "Charlie", town: "White Plains"}}, "name.town")).toEqual("White Plains");
            });

            it("Should play nice with properties that don't exist, by returning undefined", function () {
                expect(Neosavvy.Core.Utils.MapUtils.get({name: {first: "Charlie", town: "White Plains"}}, "name.town.country.something")).toBeUndefined();
            });
        });
    });
});