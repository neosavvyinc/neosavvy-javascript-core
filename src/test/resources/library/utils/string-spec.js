describe("_ns.StringUtils", function () {

    describe("isBlank", function () {
        it("Should return true for undefined", function () {
            expect(_ns.StringUtils.isBlank(undefined)).toBeTruthy();
        });

        it("Should return true for null", function () {
            expect(_ns.StringUtils.isBlank(null)).toBeTruthy();
        });

        it("Should return true for a blank string with no spaces", function () {
            expect(_ns.StringUtils.isBlank("")).toBeTruthy();
        });

        it("Should return true for a blank string with spaces", function () {
            expect(_ns.StringUtils.isBlank("  ")).toBeTruthy();
        });

        it("Should return false for 0", function () {
            expect(_ns.StringUtils.isBlank(0)).toBeFalsy();
        });

        it("Should return false for numbers", function () {
            expect(_ns.StringUtils.isBlank(21)).toBeFalsy();
        });

        it("Should return false for strings with stuff in them", function () {
            expect(_ns.StringUtils.isBlank("Mike House")).toBeFalsy();
        });

        it("Should return false for objects", function () {
            expect(_ns.StringUtils.isBlank({})).toBeFalsy();
        });
    });

});