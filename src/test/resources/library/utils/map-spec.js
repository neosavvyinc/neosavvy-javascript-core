describe("Neosavvy.Core.Utils.MapUtils", function () {
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

    describe("highPerformanceGet", function () {
        it("Should return null or undefined respectively if the map is so", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet(undefined, "name")).toBeUndefined();
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet(null, "name")).toBeNull();
        });

        it("Should return the map itself if the properties are not provided", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: "Charlie"}, null)).toEqual({name: "Charlie"});
        });

        it("Should play nice with single properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: "Charlie"}, "name")).toEqual("Charlie");
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: "Charlie", number: 7}, "number")).toEqual(7);
        });

        it("Should return the map itself when properties is blank", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: "Lesli Chow"}, "")).toEqual({name: "Lesli Chow"});
        });

        it("Should play nice with dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: {first: "Charlie", town: "White Plains"}}, "name.town")).toEqual("White Plains");
        });

        it("Should play nice with 3 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({response: {name: {first: "Charlie", town: "Jersey City"}}}, "response.name.town")).toEqual("Jersey City");
        });

        it("Should play nice with 4 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({something: {response: {name: {first: "Charlie", town: "Charleston"}}}}, "something.response.name.town")).toEqual("Charleston");
        });

        it("Should play nice with 5 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({president: {something: {response: {name: {first: "Charlie", town: "Firmwood"}}}}}, "president.something.response.name.town")).toEqual("Firmwood");
        });

        it("Should play nice with 6 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({vice: {president: {something: {response: {name: {first: "Charlie", town: "Des Moines"}}}}}}, "vice.president.something.response.name.town")).toEqual("Des Moines");
        });

        it("Should play nice with 7 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Bacon"}}}}}}}, "second.vice.president.something.response.name.town")).toEqual("Bacon");
        });

        it("Should play nice with 8 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "El Rancho"}}}}}}}}, "cool.second.vice.president.something.response.name.town")).toEqual("El Rancho");
        });

        it("Should play nice with 9 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Cleveland"}}}}}}}}}, "west.cool.second.vice.president.something.response.name.town")).toEqual("Cleveland");
        });

        it("Should play nice with 10 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({mountain: {west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Nantucket"}}}}}}}}}}, "mountain.west.cool.second.vice.president.something.response.name.town")).toEqual("Nantucket");
        });

        it("Should play nice with properties that don't exist, by returning undefined", function () {
            expect(Neosavvy.Core.Utils.MapUtils.highPerformanceGet({name: {first: "Charlie", town: "White Plains"}}, "name.town.country.something")).toBeUndefined();
        });

        it("Should throw an error when the property string is greater than 10 items long", function () {
            expect(function () {
                Neosavvy.Core.Utils.MapUtils.highPerformanceGet({}, "1.2.3.4.5.6.7.8.9.10.11")
            }).toThrow();
        });
    });

    describe("applyTo", function () {
        it("Should set a property to undefined if no value is passed in", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: "Charlie"}, 'name')).toEqual({name: undefined});
        });

        it("Should return null or undefined respectively if the map is so", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo(undefined, "name", "Mike")).toBeUndefined();
            expect(Neosavvy.Core.Utils.MapUtils.applyTo(null, "name", "George")).toBeNull();
        });

        it("Should return the map itself if the properties are not provided", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: "Charlie"}, null)).toEqual({name: "Charlie"});
        });

        it("Should play nice with single properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: "Charlie"}, "name", "Tom")).toEqual({name: "Tom"});
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: "Charlie", number: 7}, "number", 9)).toEqual({name: "Charlie", number: 9});
        });

        it("Should return the map itself when properties is blank", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: "Lesli Chow"}, "", "George Chow")).toEqual({name: "Lesli Chow"});
        });

        it("Should play nice with dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({name: {first: "Charlie", town: "White Plains"}}, "name.town", "New Haven")).toEqual({name: {first: "Charlie", town: "New Haven"}});
        });

        it("Should play nice with 3 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({response: {name: {first: "Charlie", town: "Jersey City"}}}, "response.name.town", "Singapore")).toEqual({response: {name: {first: "Charlie", town: "Singapore"}}});
        });

        it("Should play nice with 4 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({something: {response: {name: {first: "Charlie", town: "Charleston"}}}}, "something.response.name.town", "Raleigh")).toEqual({something: {response: {name: {first: "Charlie", town: "Raleigh"}}}});
        });

        it("Should play nice with 5 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({president: {something: {response: {name: {first: "Charlie", town: "Firmwood"}}}}}, "president.something.response.name.town", "Solidwood")).toEqual({president: {something: {response: {name: {first: "Charlie", town: "Solidwood"}}}}});
        });

        it("Should play nice with 6 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({vice: {president: {something: {response: {name: {first: "Charlie", town: "Des Moines"}}}}}}, "vice.president.something.response.name.town", "Cedarburg")).toEqual({vice: {president: {something: {response: {name: {first: "Charlie", town: "Cedarburg"}}}}}});
        });

        it("Should play nice with 7 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Bacon"}}}}}}}, "second.vice.president.something.response.name.town", "Ham")).toEqual({second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Ham"}}}}}}});
        });

        it("Should play nice with 8 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "El Rancho"}}}}}}}}, "cool.second.vice.president.something.response.name.town", "El Paso")).toEqual({cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "El Paso"}}}}}}}});
        });

        it("Should play nice with 9 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Cleveland"}}}}}}}}}, "west.cool.second.vice.president.something.response.name.town", "Dayton")).toEqual({west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Dayton"}}}}}}}}});
        });

        it("Should play nice with 10 dot properties", function () {
            expect(Neosavvy.Core.Utils.MapUtils.applyTo({mountain: {west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Nantucket"}}}}}}}}}}, "mountain.west.cool.second.vice.president.something.response.name.town", "Cape Cod")).toEqual({mountain: {west: {cool: {second: {vice: {president: {something: {response: {name: {first: "Charlie", town: "Cape Cod"}}}}}}}}}});
        });

        it("Should throw an error when tried to apply to a property two levels past existence", function () {
            expect(function () {
                Neosavvy.Core.Utils.MapUtils.applyTo({name: "Terrence"}, "name.first.prefix", "George");
            }).toThrow();
        });

        it("Should throw an error when the property string is greater than 10 items long", function () {
            expect(function () {
                Neosavvy.Core.Utils.MapUtils.applyTo({}, "1.2.3.4.5.6.7.8.9.10.11", 56);
            }).toThrow();
        });
    });

    describe("keysDistinct", function () {
        it("Should return true for undefined arguments", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct()).toBeTruthy();
        });

        it("Should return true for a single object", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct({schwan: 1, doo: 2})).toBeTruthy();
        });

        it("Should return true for 2 objects with distinct keys", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct({schwan: 1, doo: 2}, {tree: 3, scheven: 7})).toBeTruthy();
        });

        it("Should return true for more than 2 objects with distinct keys", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct({schwan: 1, doo: 2}, {tree: 3, scheven: 7}, {schfourteenteen: 14})).toBeTruthy();
        });

        it("Should return false for objects that have overlapping keys", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct({schwan: 1, doo: 2}, {tree: 3, doo: 7})).toBeFalsy();
        });

        it("Should return false for more than two objects where there are overlapping keys", function () {
            expect(Neosavvy.Core.Utils.MapUtils.keysDistinct({schwan: 1, doo: 2}, {tree: 3, doo: 7}, {schwan: 14})).toBeFalsy();
        });
    });
});