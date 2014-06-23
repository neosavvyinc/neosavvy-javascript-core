var _ns = _ns || {};
_ns.Core = _ns.Core || {};
_ns.Core.Utils = _ns.Core.Utils || {};

/**
 * @class _ns.Core.Utils.SpecialUtils
 * @static
 **/
_ns.Core.Utils.FunctionalUtils = (function () {
    return {
        /**
         * Allows the developer to functionally stack up methods that may fail and move on to the next in that case.
         * @param {Function...} arguments
         * @returns *
         * @method keepTrying
         **/
        tryCall:function (obj, fnName, args, elseCase) {
            var fn = _ns.Core.Utils.MapUtils.highPerformanceGet(obj, fnName);
            if (typeof fn == 'function') {
                return fn.apply(obj, args);
            }
            return elseCase;
        }
    }
})();
