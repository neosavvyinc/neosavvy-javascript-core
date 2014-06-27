var ns = ns || {};

/**
 * @class FunctionalUtils
 * @static
 **/
var FunctionalUtils = (function () {
    return {
        /**
         * Allows the developer to functionally stack up methods that may fail and move on to the next in that case.
         * @param {Function...} arguments
         * @returns *
         * @method keepTrying
         **/
        tryCall:function (obj, fnName, args, elseCase) {
            var fn = ns.MapUtils.highPerformanceGet(obj, fnName);
            if (typeof fn == 'function') {
                return fn.apply(obj, args);
            }
            return elseCase;
        }
    }
})();

_.merge(ns, FunctionalUtils);

//For backward compatibility
ns.FunctionalUtils = FunctionalUtils;
