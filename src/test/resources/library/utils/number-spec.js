describe("_ns.Core.Utils.NumberUtils", function () {

    describe("asOrdinal", function () {
        it("Should return appropriately for 1sts in different ranges", function () {
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(1)).toEqual("1st");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(11)).toEqual("11th");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(31)).toEqual("31st");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(1001)).toEqual("1001st");
        });

        it("Should return appropriately for 2nds of different ranges", function () {
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(2)).toEqual("2nd");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(12)).toEqual("12th");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(92)).toEqual("92nd");
        });

        it("Should return appropriately for 3rds of different ranges", function () {
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(3)).toEqual("3rd");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(713)).toEqual("713th");
        });

        it("Should return appropriately for 0", function () {
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(0)).toEqual("0th");
        });

        it("Should return appropriately for a random batch of numbers", function () {
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(87)).toEqual("87th");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(-214)).toEqual("-214th");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(-973)).toEqual("-973rd");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(5)).toEqual("5th");
            expect(_ns.Core.Utils.NumberUtils.asOrdinal(10010101)).toEqual("10010101st");
        });
    });

    describe("roundUpIfFloat", function () {
        it("Should keep integers the same", function () {
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(0)).toEqual(0);
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(2)).toEqual(2);
        });

        it("Should round up floats", function () {
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(2.00001)).toEqual(3);
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(79.92)).toEqual(80);
        });

        it("Should round down for negatives", function () {
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(-2.2)).toEqual(-3);
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(-37.9)).toEqual(-38);
            expect(_ns.Core.Utils.NumberUtils.roundUpIfFloat(-0.00001)).toEqual(-1);
        });
    });

    describe("leadingZeroes", function () {
        it("Should return NaN if the number is undefined, null or NaN", function () {
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(undefined)).toBeUndefined();
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(null)).toBeNull();
        });

        it("Should default to two digits when adding zeroes", function () {
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(0)).toEqual("00");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(1)).toEqual("01");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(-7)).toEqual("-07");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(55)).toEqual("55");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(-100)).toEqual("-100");
        });

        it("Should be able to take other digit input", function () {
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(0, 4)).toEqual("0000");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(5500, 10)).toEqual("0000005500");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(-2, 1)).toEqual("-2");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(-57, 4)).toEqual("-0057");
        });

        it("Should play nice with decimals", function () {
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(0.353, 4)).toEqual("0000.353");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(2.102)).toEqual("02.102");
            expect(_ns.Core.Utils.NumberUtils.leadingZeroes(-9.09)).toEqual("-09.09");
        });
    });

});