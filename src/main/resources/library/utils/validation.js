var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.Validation
 * @static
 **/
Neosavvy.Core.Utils.Validation = (function () {
    return {
        /**
         * Checks for existence of passed in value. Will be true
         * for anything other than undefined or null
         * @param {Any} x
         * @returns Boolean
         * @method existy
         **/
        existy: function (x) {
            return x != null;
        },
        /**
         * Checks for truthiness, will return true all
         * non-false, non-undefined, non-null values
         * @param {Any} x
         * @returns Boolean
         * @method truthy
         **/
        truthy: function (x) {
            return (x !== false) && Neosavvy.Core.Utils.Validation.existy(x);
        },
        validator: function (msg, fn) {
            if (typeof fn !== 'function')
                throw 'fn must be a function';

            var f = function () {
                return fn.apply(fn, arguments);
            }

            f['message'] = msg;
            return f;
        },
        setConditions: function (/* validators */) {
            var validators = _.toArray(arguments);

            return function (fn /*, arguments */) {
                var args = _.rest(arguments),
                    errors = Neosavvy.Core.Utils.CollectionUtils.flatMapConcat(function (isValid) {
                        return isValid.apply(null, args) ? [] : [isValid.message];
                    }, validators);

                if (!_.isEmpty(errors))
                    throw new Error(errors.join(', '));

                return fn.apply(null, args);
            }
        }
    }
})();
