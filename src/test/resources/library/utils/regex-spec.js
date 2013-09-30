describe("Neosavvy.Core.Utils.RegexUtils", function () {

    describe("matchStringAndLeadup", function () {

        it("Should return undefined for an undefined string", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.matchStringAndLeadup()).toBeUndefined();
        });

        it("Should return undefined for an empty string", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.matchStringAndLeadup("")).toBeUndefined();
        });

        it("Should return a regex that can match a string and every leadup word", function () {
            var re = Neosavvy.Core.Utils.RegexUtils.matchStringAndLeadup("Morton Shapiro");
            expect(re.test("M")).toBeTruthy();
            expect(re.test("N")).toBeFalsy();
            expect(re.test("Mo")).toBeTruthy();
            expect(re.test("Mor")).toBeTruthy();
            expect(re.test("Mort")).toBeTruthy();
            expect(re.test("Morto")).toBeTruthy();
            expect(re.test("Morton ")).toBeTruthy();
            expect(re.test("Norton")).toBeFalsy();
            expect(re.test("orton")).toBeFalsy();
            expect(re.test("Morton Sh")).toBeTruthy();
            expect(re.test("Morton Shap")).toBeTruthy();
            expect(re.test("Morton Shapir")).toBeTruthy();
            expect(re.test("Morton Shapiro")).toBeTruthy();
            expect(re.test("Morton Shapiro ")).toBeFalsy();
        });

        it("Should be case insensitive", function () {
            var re = Neosavvy.Core.Utils.RegexUtils.matchStringAndLeadup("Morton Shapiro");
            expect(re.test("m")).toBeTruthy();
            expect(re.test("n")).toBeFalsy();
            expect(re.test("mo")).toBeTruthy();
            expect(re.test("mor")).toBeTruthy();
            expect(re.test("mort")).toBeTruthy();
            expect(re.test("morto")).toBeTruthy();
            expect(re.test("morton ")).toBeTruthy();
            expect(re.test("norton")).toBeFalsy();
            expect(re.test("orton")).toBeFalsy();
            expect(re.test("morton sh")).toBeTruthy();
            expect(re.test("morton shap")).toBeTruthy();
            expect(re.test("morton shapir")).toBeTruthy();
            expect(re.test("morton shapiro")).toBeTruthy();
            expect(re.test("morton shapiro ")).toBeFalsy();
        });
    });

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

        it("Should return false when the string is null", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail(null)).toBeFalsy();
        });

        it("Should return false when the string is undefined", function () {
            expect(Neosavvy.Core.Utils.RegexUtils.isEmail(undefined)).toBeFalsy();
        });
    });

});