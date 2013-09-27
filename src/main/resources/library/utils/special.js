var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.SpecialUtils
 * @static
 **/
Neosavvy.Core.Utils.SpecialUtils = (function () {
    return {
        keepTrying:function () {
            function _keepTrying() {
                if (arguments.length) {
                    if ((arguments.length % 2) === 0) {
                        try {
                            return arguments[0].apply(this, arguments[1]);
                        } catch (e) {
                            return _keepTrying.apply(this, Array.prototype.slice.call(arguments, 2));
                        }
                    } else {
                        throw "Keep trying requires an event number of arguments. Even indices are functions and odd indices are arrays or empty arrays of their arguments!";
                    }
                }
                return null;
            }

            return _keepTrying.apply(this, arguments);
        }
    }
})();
