describe("Neosavvy.Core.Utils.StringUtils", function () {

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

});