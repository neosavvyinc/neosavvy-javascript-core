describe("ns.RequestUrlBuilder", function () {

    it("Should throw an error if no baseUrl param is provided", function () {
        expect(function () {
            new ns.RequestUrlBuilder();
        }).toThrow();

        expect(function () {
            new ns.RequestUrlBuilder(null);
        }).toThrow();

        expect(function () {
            new ns.RequestUrlBuilder("");
        }).toThrow();
    });

    it("Should instantiate keyValues as an empty object", function () {
        expect(new ns.RequestUrlBuilder("http://www.neosavvy.com").keyValues).toEqual({});
    });

    it("Should instantiate replacements as an empty object", function () {
        expect(new ns.RequestUrlBuilder("http://www.neosavvy.com").replacements).toEqual({});
    });

    it("Should set the baseUrl to the baseUrl parameter", function () {
        expect(new ns.RequestUrlBuilder("http://www.neosavvy.com").baseUrl).toEqual("http://www.neosavvy.com");
    });

    describe("addParam", function () {
        it("Should throw an error if both the key and value are undefined", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com").addParam();
            }).toThrow();
        });

        it("Should throw an error if the key is defined but not an object", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com").addParam("myKey");
            }).toThrow();
        });

        it("Should throw an error if the user has attempted to overwrite and existing key", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com").addParam("myKey", 50).addParam("myKey", 60);
            }).toThrow();
        });

        it("Should throw an error if passed objects with overlapping keys", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com").addParam({name: "Steve"}).addParam({name: "Tom"});
            }).toThrow();
        });

        it("Should return the builder", function () {
            var builder = new ns.RequestUrlBuilder("http://www.neosavvy.com");
            expect(builder.addParam("someKey", 80)).toEqual(builder);
        });
    });

    describe("paramReplace", function () {
        it("Should throw an error for a double replace", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:myParam").paramReplace(":myParam", 5).paramReplace(":myParam", 6);
            }).toThrow();
        });

        it("Should throw an error for a double replace with an object", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:myParam").paramReplace({":myParam": 5}).paramReplace({":myParam": 6});
            }).toThrow();
        });

        it("Should return the builder", function () {
            var builder = new ns.RequestUrlBuilder("http://www.neosavvy.com");
            expect(builder.paramReplace("name", "George")).toEqual(builder);
        });

        it("Should throw an error if the key is not an object but provided", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:name").paramReplace(":name");
            }).toThrow();
        });

        it("Should throw an error if both arguments are undefined", function () {
            expect(function () {
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:myParam").paramReplace();
            }).toThrow();
        });
    });

    describe("build", function () {

        it("Should return the baseUrl if no params are provided", function () {
            expect(new ns.RequestUrlBuilder("http://www.neosavvy.com").build()).toEqual("http://www.neosavvy.com");
        });

        it("Should return the baseUrl with params if there are some", function () {
            expect(
                new ns.RequestUrlBuilder("http://www.neosavvy.com").
                    addParam("name", 40).
                    addParam({age: "Tom", color: "Green"}).
                    build()
            ).toEqual("http://www.neosavvy.com?name=40&age=Tom&color=Green");

        });

        it("Should be able to return a url with replaced params", function () {
            expect(
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:house/story").
                    paramReplace(":house", "red").
                    paramReplace("com", "net").
                    paramReplace({story: 67}).
                    build()
            ).toEqual("http://www.neosavvy.net/red/67");
        });

        it("Should be able to return a url with replaced params and params", function () {
            expect(
                new ns.RequestUrlBuilder("http://www.neosavvy.com/:house/story").
                    paramReplace(":house", "red").
                    paramReplace("com", "net").
                    paramReplace({story: 67}).
                    addParam({color: 66, age: 67}).
                    addParam("something", "fish").
                    build()
            ).toEqual("http://www.neosavvy.net/red/67?color=66&age=67&something=fish");
        });

    });

});