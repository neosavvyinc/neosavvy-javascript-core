describe("StringUtils", function () {

    describe("isBlank", function () {
        it("Should return true for undefined", function () {
            expect(ns.isBlank(undefined)).toBeTruthy();
        });

        it("Should return true for null", function () {
            expect(ns.isBlank(null)).toBeTruthy();
        });

        it("Should return true for a blank string with no spaces", function () {
            expect(ns.isBlank("")).toBeTruthy();
        });

        it("Should return true for a blank string with spaces", function () {
            expect(ns.isBlank("  ")).toBeTruthy();
        });

        it("Should return false for 0", function () {
            expect(ns.isBlank(0)).toBeFalsy();
        });

        it("Should return false for numbers", function () {
            expect(ns.isBlank(21)).toBeFalsy();
        });

        it("Should return false for strings with stuff in them", function () {
            expect(ns.isBlank("Mike House")).toBeFalsy();
        });

        it("Should return false for objects", function () {
            expect(ns.isBlank({})).toBeFalsy();
        });
    });

});