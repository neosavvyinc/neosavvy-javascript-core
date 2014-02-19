var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.SpecialUtils
 * @static
 **/
Neosavvy.Core.Utils.FunctionalUtils = (function () {
    return {
        /**
         * Allows the developer to functionally stack up methods that may fail and move on to the next in that case.
         * @param {Function...} arguments
         * @returns *
         * @method keepTrying
         **/
        tryCall:function (obj, fnName, args, elseCase) {
            var fn = Neosavvy.Core.Utils.MapUtils.highPerformanceGet(obj, fnName);
            if (typeof fn == 'function') {
                return fn.apply(obj, args);
            }
            return elseCase;
        }
    }
})();
