describe("NumberUtils", function () {

    describe("asOrdinal", function () {
        it("Should return appropriately for 1sts in different ranges", function () {
            expect(ns.asOrdinal(1)).toEqual("1st");
            expect(ns.asOrdinal(11)).toEqual("11th");
            expect(ns.asOrdinal(31)).toEqual("31st");
            expect(ns.asOrdinal(1001)).toEqual("1001st");
        });

        it("Should return appropriately for 2nds of different ranges", function () {
            expect(ns.asOrdinal(2)).toEqual("2nd");
            expect(ns.asOrdinal(12)).toEqual("12th");
            expect(ns.asOrdinal(92)).toEqual("92nd");
        });

        it("Should return appropriately for 3rds of different ranges", function () {
            expect(ns.asOrdinal(3)).toEqual("3rd");
            expect(ns.asOrdinal(713)).toEqual("713th");
        });

        it("Should return appropriately for 0", function () {
            expect(ns.asOrdinal(0)).toEqual("0th");
        });

        it("Should return appropriately for a random batch of numbers", function () {
            expect(ns.asOrdinal(87)).toEqual("87th");
            expect(ns.asOrdinal(-214)).toEqual("-214th");
            expect(ns.asOrdinal(-973)).toEqual("-973rd");
            expect(ns.asOrdinal(5)).toEqual("5th");
            expect(ns.asOrdinal(10010101)).toEqual("10010101st");
        });
    });

    describe("roundUpIfFloat", function () {
        it("Should keep integers the same", function () {
            expect(ns.roundUpIfFloat(0)).toEqual(0);
            expect(ns.roundUpIfFloat(2)).toEqual(2);
        });

        it("Should round up floats", function () {
            expect(ns.roundUpIfFloat(2.00001)).toEqual(3);
            expect(ns.roundUpIfFloat(79.92)).toEqual(80);
        });

        it("Should round down for negatives", function () {
            expect(ns.roundUpIfFloat(-2.2)).toEqual(-3);
            expect(ns.roundUpIfFloat(-37.9)).toEqual(-38);
            expect(ns.roundUpIfFloat(-0.00001)).toEqual(-1);
        });
    });

    describe("leadingZeroes", function () {
        it("Should return NaN if the number is undefined, null or NaN", function () {
            expect(ns.leadingZeroes(undefined)).toBeUndefined();
            expect(ns.leadingZeroes(null)).toBeNull();
        });

        it("Should default to two digits when adding zeroes", function () {
            expect(ns.leadingZeroes(0)).toEqual("00");
            expect(ns.leadingZeroes(1)).toEqual("01");
            expect(ns.leadingZeroes(-7)).toEqual("-07");
            expect(ns.leadingZeroes(55)).toEqual("55");
            expect(ns.leadingZeroes(-100)).toEqual("-100");
        });

        it("Should be able to take other digit input", function () {
            expect(ns.leadingZeroes(0, 4)).toEqual("0000");
            expect(ns.leadingZeroes(5500, 10)).toEqual("0000005500");
            expect(ns.leadingZeroes(-2, 1)).toEqual("-2");
            expect(ns.leadingZeroes(-57, 4)).toEqual("-0057");
        });

        it("Should play nice with decimals", function () {
            expect(ns.leadingZeroes(0.353, 4)).toEqual("0000.353");
            expect(ns.leadingZeroes(2.102)).toEqual("02.102");
            expect(ns.leadingZeroes(-9.09)).toEqual("-09.09");
        });
    });

});