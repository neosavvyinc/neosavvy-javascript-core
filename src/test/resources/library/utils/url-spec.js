describe("url utils",function() {

    describe("basic parsing", function() {

        var origUrl = 'http://www.google.com:8080/?q=red%20roses#this#is#a#test';
        var url = Neosavvy.Core.Utils.UrlUtils.URL.parse(origUrl);
        var queryString = url.getQueryString();

        it('should format ' + url, function() {
            expect(url.toString()).toEqual(origUrl);
        });

        it('should parse protocol in ' + url, function() {
            expect(url.protocol).toEqual('http');
        });

        it('should parse host in ' + url, function() {
            expect(url.host).toEqual('www.google.com');
        });

        it('should parse port in ' + url, function() {
            expect(url.port).toEqual('8080');
        });

        it('should parse query string in ' + url, function() {
            expect(queryString.get('q')).toEqual('red roses');
        });

        it('should parse hash in ' + url, function() {
            expect(url.hash).toEqual('this#is#a#test');
        });

    });


    describe("more basic parsing", function() {
        var origUrl = 'http://www.google.com:8080/?q=red%20roses&q=something#this#is#a#test';
        var url = Neosavvy.Core.Utils.UrlUtils.URL.parse(origUrl);
        var queryString = url.getQueryString();

        it('should format ' + url, function() {
            expect(url.toString()).toEqual(origUrl);
        });

        it('should parse protocol in ' + url, function() {
            expect(url.protocol).toEqual('http');
        });

        it('should parse host in ' + url, function() {
            expect(url.host).toEqual('www.google.com');
        });

        it('should parse port in ' + url, function() {
            expect(url.port).toEqual('8080');
        });

        it('should parse query string in ' + url, function() {
            expect(queryString.get('q')).toEqual(['red roses', 'something']);
        });

        it('should parse hash in ' + url, function() {
            expect(url.hash).toEqual('this#is#a#test');
        });
    });

    describe("change a hostname after it is set", function() {

        var originalUrl = "http://www.neosavvy.com/wrote/this/awesome/app";
        var url = Neosavvy.Core.Utils.UrlUtils.URL.parse(originalUrl);

        it("should correctly return the hostname", function() {
            expect(url.host).toEqual("www.neosavvy.com");
        })

        it("should allow you to override the hostname", function() {
            url.setHost("www.adam.com");
            expect(url.host).toEqual("www.adam.com");
            expect(url.toString()).toEqual("http://www.adam.com/wrote/this/awesome/app");
        })


    })
})