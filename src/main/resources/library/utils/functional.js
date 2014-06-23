var _ns = _ns || {};

/**
 * @class _ns.Core.Utils.SpecialUtils
 * @static
 **/
_ns.FunctionalUtils = (function () {
    return {
        /**
         * Allows the developer to functionally stack up methods that may fail and move on to the next in that case.
         * @param {Function...} arguments
         * @returns *
         * @method keepTrying
         **/
        tryCall:function (obj, fnName, args, elseCase) {
            var fn = _ns.MapUtils.highPerformanceGet(obj, fnName);
            if (typeof fn == 'function') {
                return fn.apply(obj, args);
            }
            return elseCase;
        }
    }
})();
