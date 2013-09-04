describe("Neosavvy.Core.Utils.RegexUtils", function () {

    describe("isEmail", function () {
        it("Should return true for a valid email", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail("tewen@neosavvy.com")).toBeTruthy();
        });

        it("Should return true for other valid emails with weirder suffix", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail("mike.howard@worldbiz.me")).toBeTruthy();
        });

        it("Should return false for missing @ signs", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail("someone&earthlink.net")).toBeFalsy();
        });

        it("Should return false with spaces", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail("some name of a@comcastic.comc")).toBeFalsy();
        });
    });

});