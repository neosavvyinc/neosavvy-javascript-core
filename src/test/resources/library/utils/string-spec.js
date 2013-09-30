describe("Neosavvy.Core.Utils.StringUtils", function () {

    describe("truncate", function () {
        it("Should not do anything if the string length is under the character count", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate("Mike", 5)).toEqual("Mike");
        });

        it("Should include dots by default", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate("Quincy Times", 6)).toEqual("Quincy...");
        });

        it("Should truncate strings without dots if specified", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate("Quincy Times", 6, false)).toEqual("Quincy");
        });

        it("Should return undefined if the string is undefined", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate()).toBeUndefined();
        });

        it("Should return null if the string is null", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate(null)).toBeNull();
        });

        it("Should return the string if there is no character count defined", function () {
            expect(Neosavvy.Core.Utils.StringUtils.truncate("RedBlueGreen", 0)).toEqual("RedBlueGreen");
        });
    });

    describe("isBlank", function () {
        it("Should return true for undefined", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank(undefined)).toBeTruthy();
        });

        it("Should return true for null", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank(null)).toBeTruthy();
        });

        it("Should return true for a blank string with no spaces", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank("")).toBeTruthy();
        });

        it("Should return true for a blank string with spaces", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank("  ")).toBeTruthy();
        });

        it("Should return false for 0", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank(0)).toBeFalsy();
        });

        it("Should return false for numbers", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank(21)).toBeFalsy();
        });

        it("Should return false for strings with stuff in them", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank("Mike House")).toBeFalsy();
        });

        it("Should return false for objects", function () {
            expect(Neosavvy.Core.Utils.StringUtils.isBlank({})).toBeFalsy();
        });
    });

    describe("remove", function () {

        it("Should return undefined if the value is undefined", function () {
            expect(Neosavvy.Core.Utils.StringUtils.remove()).toBeUndefined();
        });

        it("Should return null if the value is null ", function () {
            expect(Neosavvy.Core.Utils.StringUtils.remove(null)).toBeNull();
        });

        it("Should return the value if no removals are specified", function () {
            expect(Neosavvy.Core.Utils.StringUtils.remove("Town House")).toEqual("Town House");
        });

        it("Should remove all the specified strings in the arguments", function () {
            expect(Neosavvy.Core.Utils.StringUtils.remove("Rock N Roll Night Club", "R", "Night Club")).toEqual("ock N oll ");
        });

        it("Should be able to convert the given arguments to strings", function () {
            expect(Neosavvy.Core.Utils.StringUtils.remove("55 is meat, fool!", 5, "!")).toEqual(" is meat, fool");
        });
    });

});