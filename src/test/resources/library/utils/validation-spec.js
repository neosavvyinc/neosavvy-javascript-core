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

    describe('setConditions', function () {
        var setConditions,
            validator;

        beforeEach (function () {
            setConditions = Neosavvy.Core.Utils.Validation.setConditions;
            validator = Neosavvy.Core.Utils.Validation.validator;
        });

        it('should work with a single validator', function () {
             var valOne = validator('must be greater than 5', function (x) {
                 return x > 5;
             });

             var res = setConditions(valOne);
             expect(res(_.identity, 6)).toEqual(6);

             expect(function () {
                 res(_.identity, 4)
             }).toThrow('must be greater than 5');
        });

        it('should work with multiple validators', function () {
            var valOne = validator('must be greater than 5', function (x) {
                return x > 5;
            });

            var valTwo = validator('must be less than 10', function (x) {
                return x < 10;
            });
            var res = setConditions(valOne, valTwo);

            expect(res(_.identity, 7)).toEqual(7);

            expect(function () {
                res(_.identity, 10);
            }).toThrow('must be less than 10');

            expect(function () {
                res(_.identity, 5);
            }).toThrow('must be greater than 5');
        });

        it('should work with multiple parameters', function () {
            var valOne = validator('must be greater than 5', function (x) {
                return x > 5;
            });

            var valTwo = validator('must be less than 10', function (x, y) {
                return y < 10;
            });
            var res = setConditions(valOne, valTwo);

            expect(res(_.identity, 10, 2)).toEqual(10);

            expect(function () {
                res(_.identity, 3, 11);
            }).toThrow('must be greater than 5, must be less than 10');

            expect(function () {
                res(_.identity, 3, 9);
            }).toThrow('must be greater than 5');

            expect(function () {
                res(_.identity, 6, 12);
            }).toThrow('must be less than 10');
        });

        it('should work with _.partial to apply pre-conditions to functions', function () {
             var uncheckedSquare = function (x, y, z) {
                 return [x*x, y*y, z*z];
             };

             var pre = setConditions(
                 validator('x must be greater than 1', function (x, y, z) { return x > 1; }),
                 validator('y must be greater than 2', function (x, y, z) { return y > 2; }),
                 validator('z must be greater than 3', function (x, y, z) { return z > 3; })
             );

             var checkedSquare = _.partial(pre, uncheckedSquare);

             expect(checkedSquare(2,3,4)).toEqual([4,9,16]);

             expect(function () {
                 checkedSquare(1,3,4)
             }).toThrow('x must be greater than 1');

             expect(function () {
                 checkedSquare(2,2,4)
             }).toThrow('y must be greater than 2');

             expect(function () {
                 checkedSquare(2,3,3)
             }).toThrow('z must be greater than 3');

             expect(function () {
                 checkedSquare(1,2,3)
             }).toThrow('x must be greater than 1, y must be greater than 2, z must be greater than 3');
        });

        it('should  /* does things /*', function () {
            var uncheckedLink = function (scope, elem, attrs) {
                return scope; 
            };

            var pre = setConditions(
                validator('scope must be defined', function (scope) {
                    return !_.isUndefined(scope);
                })
            );

            var checkedLink = _.partial(pre, uncheckedLink);

            expect(checkedLink({ name: 'myScope' })).toEqual({ name: 'myScope' });
            expect(function () {
                checkedLink();
            }).toThrow('scope must be defined');
        });
    });
    
});

