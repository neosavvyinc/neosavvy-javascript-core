describe("UrlUtils", function () {

    describe("URL", function () {

        it("Should be able to construct a url with the url and queryString", function () {
            new _ns.URL("http://www.neosavvy.com", "id=50");
        });

        it("Should throw an error when no url is provided", function () {
            expect(function () {
                new _ns.URL(undefined, "id=50");
            }).toThrow();
        });

        it("Should add the query string to its own query string when called", function () {
            var url = new _ns.URL("http://www.neosavvy.com", "id=50");
            expect(url.getQueryString().toString()).toEqual("id=50");
        });

        describe("parse", function () {
            describe("basic", function () {
                var origUrl = 'http://www.google.com:8080/?q=red%20roses#this#is#a#test';
                var url = _ns.parse(origUrl);
                var queryString = url.getQueryString();

                it('should format ' + url, function () {
                    expect(url.toString()).toEqual(origUrl);
                });

                it('should parse protocol in ' + url, function () {
                    expect(url.protocol).toEqual('http');
                });

                it('should parse host in ' + url, function () {
                    expect(url.host).toEqual('www.google.com');
                });

                it('should parse port in ' + url, function () {
                    expect(url.port).toEqual('8080');
                });

                it('should parse query string in ' + url, function () {
                    expect(queryString.get('q')).toEqual('red roses');
                });

                it('should parse hash in ' + url, function () {
                    expect(url.hash).toEqual('this#is#a#test');
                });
            });

            describe("advanced", function () {
                var origUrl = 'http://www.google.com:8080/?q=red%20roses&q=something#this#is#a#test';
                var url = _ns.parse(origUrl);
                var queryString = url.getQueryString();

                it('should format ' + url, function () {
                    expect(url.toString()).toEqual(origUrl);
                });

                it('should parse protocol in ' + url, function () {
                    expect(url.protocol).toEqual('http');
                });

                it('should parse host in ' + url, function () {
                    expect(url.host).toEqual('www.google.com');
                });

                it('should parse port in ' + url, function () {
                    expect(url.port).toEqual('8080');
                });

                it('should parse query string in ' + url, function () {
                    expect(queryString.get('q')).toEqual(['red roses', 'something']);
                });

                it('should parse hash in ' + url, function () {
                    expect(url.hash).toEqual('this#is#a#test');
                });
            });
        });

        describe("isValidProtocol", function () {
            it("Should true when the protocol is valid", function () {
                expect(_ns.URL.isValidProtocol("www.broadway.com")).toBeTruthy();
            });

            it("Should return false when the protocol is invalid", function () {
                expect(_ns.URL.isValidProtocol("w%ww.broadw$ay.com")).toBeFalsy();
            });
        });

        describe("setQueryString", function () {
            it("Should set the query string of the url", function () {
                var url = new _ns.URL("http://www.neosavvy.com", "id=50");
                url.setQueryString("QUERY STRING TEST");
                expect(url.queryString).toEqual("QUERY STRING TEST");
            });
        });

        describe("removeParameter", function () {
            it("Should remove a specified parameter from the url", function () {
                var url = new _ns.URL("http://www.neosavvy.com", "name=sprite&make=chevy");
                url.removeParameter("name");
                expect(url.getQueryString().toString()).toEqual("make=chevy");
            });

            it("Should do nothing if the parameter is not present", function () {
                var url = new _ns.URL("http://www.neosavvy.com", "uid=sprite&make=chevy");
                url.removeParameter("name");
                expect(url.getQueryString().toString()).toEqual("uid=sprite&make=chevy");
            });
        });

        describe("setParameter", function () {
            var url;

            beforeEach(function () {
                url = new _ns.URL("http://www.neosavvy.com", "uid=sprite&make=chevy");
            });

            it("Should be able to change a parameter", function () {
                url.setParameter("make", "ford");
                expect(url.getQueryString().toString()).toEqual("uid=sprite&make=ford");
            });

            it("Should be able to remove a parameter if the value is undefined", function () {
                url.setParameter("make", undefined);
                expect(url.getQueryString().toString()).toEqual("uid=sprite");
            });

            it("Should be able to remove a parameter if the value is null", function () {
                url.setParameter("make", null);
                expect(url.getQueryString().toString()).toEqual("uid=sprite");
            });

            it("Should be able to add a parameter", function () {
                url.setParameter("height", 5.6);
                expect(url.getQueryString().toString()).toEqual("uid=sprite&make=chevy&height=5.6");
            });
        });

        describe("setHost", function () {
            it("should set and get host", function () {
                var url = _ns.URL.parse("http://www.neosavvy.com/something/else");
                expect(url.getHost()).toEqual("www.neosavvy.com");
                url.setHost("api.neosavvy.com");
                expect(url.getHost()).toEqual("api.neosavvy.com");

                expect(url.getPath()).toEqual("/something/else");
                url.setPath("/another/service/location")
                expect(url.getPath()).toEqual("/another/service/location");

            });

            it("should correctly return the hostname", function () {
                var originalUrl = "http://www.neosavvy.com/wrote/this/awesome/app";
                var url = _ns.URL.parse(originalUrl);
                expect(url.host).toEqual("www.neosavvy.com");
            });

            it("should allow you to override the hostname", function () {
                var originalUrl = "http://www.neosavvy.com/wrote/this/awesome/app";
                var url = _ns.URL.parse(originalUrl);
                url.setHost("www.adam.com");
                expect(url.host).toEqual("www.adam.com");
                expect(url.toString()).toEqual("http://www.adam.com/wrote/this/awesome/app");
            });
        });

        describe("getParameter", function () {
            var url;

            beforeEach(function () {
                url = new _ns.URL("http://www.evileyes.org:87", "uid=sprite&make=chevy");
            });

            it("Should return a parameter in the url", function () {
                expect(url.getParameter("uid")).toEqual("sprite");
            });

            it("Should return null if the parameter does not exist", function () {
                expect(url.getParameter("food")).toBeNull();
            });
        });

        describe("getPort", function () {
            var url;

            beforeEach(function () {
                url = new _ns.URL("http://www.neosavvy.com:96", "uid=sprite&make=chevy");
            });

            it("Should return a port if one is defined", function () {
                expect(url.getPort()).toEqual(96);
            });

            it("Should return 80 if the protocol is http", function () {
                url.port = undefined;
                expect(url.getPort()).toEqual(80);
            });

            it("Should return 443 if the protocol is https", function () {
                url.port = undefined;
                url.protocol = "https";
                expect(url.getPort()).toEqual(443);
            });

            it("Should return undefined if the port is undefine and the protocol is unknown", function () {
                url.port = undefined;
                url.protocol = "NOBODY HAS HEARD OF THIS!";
                expect(url.getPort()).toBeUndefined();
            });
        });
    });

    describe("QueryString", function () {
        var qs;

        beforeEach(function () {
            qs = new _ns.QueryString("make=ford&model=T&cut=75");
        });

        describe("getParameters", function () {
            it("Should return a hash of all the parameters", function () {
                expect(qs.getParameters()).toEqual({make: "ford", model: "T", cut: "75"});
            });

            it("Should return a blank hash for a blank query string", function () {
                qs = new _ns.QueryString("");
                expect(qs.getParameters()).toEqual({});
            });
        });

        describe("parse", function () {

            describe("definition", function () {
                it("Should just return a new QueryString when passed nothing", function () {
                    expect(_ns.QueryString.parse()).toEqual(new _ns.QueryString());
                });

                it("Should just return the queryString if it is passed the object", function () {
                    expect(_ns.QueryString.parse(new _ns.QueryString())).toEqual(new _ns.QueryString());
                });
            });

            describe("prototype", function () {
                it("Should be able to create a new string", function () {
                    qs = new _ns.QueryString.parse("hair=brown&eyes=blue");
                    expect(qs.getParameters()).toEqual({hair: "brown", eyes: "blue"});
                });

                it("Should be able to create a QueryString from an existing one", function () {
                    qs = new _ns.QueryString.parse(qs);
                    expect(qs.getParameters()).toEqual({make: "ford", model: "T", cut: "75"});
                });

                it("Should play nice with a parsible object", function () {
                    qs = new _ns.QueryString();
                    qs.parse({dollars: 50, cents: 89});
                    expect(qs.getParameters()).toEqual({dollars: 50, cents: 89});
                });

                it("Should set a param to null if there is no equal sign", function () {
                    qs = new _ns.QueryString.parse("country");
                    expect(qs.getParameters()).toEqual({country: null});
                });

                it("Should not add a param if it does not have a name", function () {
                    qs = new _ns.QueryString.parse("=saudiarabia");
                    expect(qs.getParameters()).toEqual({});
                });
            });


        });

        describe("remove", function () {
            it("Should remove an existent parameter", function () {
                qs.remove("cut");
                expect(qs.getParameters()).toEqual({make: "ford", model: "T"});
            });

            it("Should do nothing if the parameter does not exist", function () {
                qs.remove("size");
                expect(qs.getParameters()).toEqual({make: "ford", model: "T", cut: "75"});
            });
        });

        describe("set", function () {
            it("Should remove the param if it is equal to undefined", function () {
                qs.set("make", undefined);
                expect(qs.getParameters()).toEqual({model: "T", cut: "75"});
            });

            it("Should remove the param if it is equal to null", function () {
                qs.set("cut", null);
                expect(qs.getParameters()).toEqual({make: "ford", model: "T"});
            });

            it("Should be able to update a param", function () {
                qs.set("make", "pontiac");
                expect(qs.getParameters()).toEqual({make: "pontiac", model: "T", cut: "75"});
            });

            it("Should be able to add a param", function () {
                qs.set("count", "20");
                expect(qs.getParameters()).toEqual({make: "ford", model: "T", cut: "75", count: "20"});
            });
        });

        describe("add", function () {
            it("Should work with multiple parameters", function () {
                qs = new _ns.QueryString();
                qs.parse({dollars: [17, 26, 89], cents: 89});
                expect(qs.getParameters()).toEqual({dollars: [17, 26, 89], cents: 89});
                qs.add("dollars", 18);
                expect(qs.getParameters()).toEqual({dollars: [17, 26, 89, 18], cents: 89});
            });

            it("Should work with adding another array to multiple parameters", function () {
                qs = new _ns.QueryString();
                qs.parse({dollars: [17, 26, 89], cents: 89});
                expect(qs.getParameters()).toEqual({dollars: [17, 26, 89], cents: 89});
                qs.add("dollars", [90, 92]);
                expect(qs.getParameters()).toEqual({dollars: [17, 26, 89, 90, 92], cents: 89});
            });
        });

        describe("get", function () {
            it("Should return a property", function () {
                expect(qs.get("cut")).toEqual("75");
            });

            it("Should return nothing if the property is undefined", function () {
                expect(qs.get("somethingelse")).toBeNull();
            });
        });

        describe("toString", function () {
            it("Should be able to return the QueryString as a string", function () {
                expect(qs.toString()).toEqual("make=ford&model=T&cut=75");
            });

            it("Should work with null and undefined properties", function () {
                qs = new _ns.QueryString.parse("hair=brown&eyes=blue&something");
                expect(qs.toString()).toEqual("hair=brown&eyes=blue&something");
            });
        });
    });

    describe("parse", function () {
        it("Should call the URL.parse method", function () {
            var parseSpy = spyOn(_ns.URL, "parse").andReturn("PARSE!");
            expect(_ns.parse(1, 2, 7)).toEqual("PARSE!");
            expect(parseSpy).toHaveBeenCalledWith(1, 2, 7);
        });

        it("Should only set a protocol for http", function () {
            expect(_ns.parse("http:").protocol).toEqual("http");
        });

        it("Should play nice with non http or https protocols", function () {
            expect(_ns.parse("ftp:neosavvy.org").protocol).toEqual("ftp");
            expect(_ns.parse("ftp:neosavvy.org").path).toEqual("neosavvy.org");
        });

        it("should throw an error when undefined or null param for url", function () {
            expect(function () {
                _ns.parse(undefined)
            }).toThrow(new Error("Can not create a url with undefined URL param"));
        });

    });
})