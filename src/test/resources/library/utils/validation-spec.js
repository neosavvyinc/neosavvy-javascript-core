describe('Neosavvy.Core.Utils.Validation', function () {

    describe('existy', function () {
        var existy;
        beforeEach (function () {
             existy = Neosavvy.Core.Utils.Validation.existy;
        });

        it('should return false for null', function () {
            expect(existy(null)).toBeFalsy();
        });

        it('should return false for undefined', function () {
            expect(existy(undefined)).toBeFalsy();
        });

        it('should return true for false', function () {
            expect(existy(false)).toBeTruthy();
        });

        it('should return true for objects', function () {
            expect(existy({})).toBeTruthy();
        });

        it('should return true for strings', function () {
            expect(existy('BANANAS')).toBeTruthy();
        });
    });

    describe('truthy', function () {
        var truthy;
        beforeEach (function () {
            truthy = Neosavvy.Core.Utils.Validation.truthy;
        });

        it('should return false for false', function () {
             expect(truthy(false)).toBeFalsy();
        });

        it('should return false for undefined', function () {
             expect(truthy(undefined)).toBeFalsy();
        });

        it('should return false for null', function () {
             expect(truthy(null)).toBeFalsy();
        });

        it('should return true for true', function () {
             expect(truthy(true)).toBeTruthy();
        });

        it('should return true for objects', function () {
             expect(truthy({})).toBeTruthy();
        });

        it('should return true for strings', function () {
             expect(truthy('COCONUTS')).toBeTruthy();
        });
    });

    describe('validator', function () {
        var validator;
        beforeEach (function () {
            validator = Neosavvy.Core.Utils.Validation.validator;
        });

        it('should return a function with the message defined', function () {
            var fn = validator('test message', function () {});
            expect(typeof fn).toEqual('function');
            expect(fn.message).toEqual('test message');
        });

        it('should throw if fn is not a function', function () {
             expect(function () {
                 validator('some message', 'not a function');
             }).toThrow('fn must be a function');
        });

        it('should allow calling the original function', function () {
            var testFn = function (x) {
                return x * x;
            }

            var res = validator('oh noes', testFn);
            expect(res(4)).toEqual(testFn(4));
        });
    });
    
});

