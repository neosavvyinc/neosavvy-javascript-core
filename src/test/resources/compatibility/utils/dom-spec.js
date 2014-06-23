describe("Neosavvy.Core.Utils.DomUtils", function () {
    describe("getElementsByAttribute", function () {
        beforeEach(function() {
            $('body').append('<div first-name="clark" age="43"></div>');
            $('body').append('<a first-name="jerry" age="36"></div>');
            $('body').append('<a first-name="larry" age="36"></div>');
            $('body').append('<div age="49"></div>');
            $('body').append('<span first-name="clark" age="36"></div>');
            $('body').append('<span first-name="clark" age="37"></div>');
        });

        it("Should return one item match the first-name attribute", function () {
            expect(Neosavvy.Core.Utils.DomUtils.getElementsByAttribute('div', 'first-name', "clark").length).toEqual(1);
        });

        it("Should return two items matching the first-name attribute", function () {
            expect(Neosavvy.Core.Utils.DomUtils.getElementsByAttribute('span', 'first-name', "clark").length).toEqual(2);
        });

        it("Should return one item matching the age attribute", function () {
            expect(Neosavvy.Core.Utils.DomUtils.getElementsByAttribute('div', 'age', "49").length).toEqual(1);
        });

        it("Should return two items matching the age attribute", function () {
            expect(Neosavvy.Core.Utils.DomUtils.getElementsByAttribute('a', 'age', "36").length).toEqual(2);
        });

        it("Should be able to pick up all the ones where an attribute is undefined", function () {
            expect(Neosavvy.Core.Utils.DomUtils.getElementsByAttribute('div', 'first-name', undefined).length).toEqual(1);
        });

        afterEach(function() {
            $('body').empty();
        });
    });
});