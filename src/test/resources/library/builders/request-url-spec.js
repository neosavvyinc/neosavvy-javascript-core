describe("Neosavvy.Core.Builders.RequestUrlBuilder", function () {

    it("Should throw an error if no baseUrl param is provided", function () {
        expect(function () {
            new Neosavvy.Core.Builders.RequestUrlBuilder();
        }).toThrow();

        expect(function () {
            new Neosavvy.Core.Builders.RequestUrlBuilder(null);
        }).toThrow();

        expect(function () {
            new Neosavvy.Core.Builders.RequestUrlBuilder("");
        }).toThrow();
    });

});