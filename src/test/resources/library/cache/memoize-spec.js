describe("memoize", function () {

    it("Should attach a memoize function to the window or global object", function () {
        expect(window.memoize).toBeDefined();
        expect(typeof window.memoize === 'function').toBeTruthy();
    });

    it("Should return a memoized function when passed another function", function () {
        expect(typeof memoize(function () {
        })).toEqual('function');
    });

    it("Should attach a __cache.remove method to the new function that is created", function () {
        expect(memoize(function() {}).__cache.remove).toBeDefined();
        expect(typeof memoize(function() {}).__cache.remove).toEqual('function');
    });

    it("Should return the values from cache", function () {
        var memoized = memoize(function(n, j) {
            return n + j;
        });
        expect(memoized(5, 4)).toEqual(9);
        expect(memoized(5, 4)).toEqual(9);
    });

    it("Should stringify all the arguments passed to the function", function () {
        var stringifySpy = spyOn(JSON, 'stringify').andCallThrough();
        var memoized = memoize(function() {});
        memoized.apply(this, ["Hello", "Hello", 55]);
        expect(stringifySpy).toHaveBeenCalledWith(["Hello", "Hello", 55]);
    });

    it("Should call stringify with all the arguments when remove is called", function () {
        var stringifySpy = spyOn(JSON, 'stringify').andCallThrough();
        var memoized = memoize(function() {});
        memoized.__cache.remove.apply(this, ["Hello", "Hello", 55]);
        expect(stringifySpy).toHaveBeenCalledWith(["Hello", "Hello", 55]);
    });
});