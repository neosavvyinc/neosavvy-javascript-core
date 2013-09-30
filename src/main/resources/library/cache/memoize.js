/**
 * @class global
 * Memoize caches input output functions return values. Just alter the function by passing it into memoize, and you have the cached version.
 * @param {Function} func
 * @returns Function
 * @method memoize
 **/
(function (global) {
    "use strict";
    global.memoize || (global.memoize = (typeof JSON === 'object' && typeof JSON.stringify === 'function' ?
        function (func) {
            var stringifyJson = JSON.stringify,
                cache = {};

            var cachedfun = function () {
                var hash = stringifyJson(arguments);
                return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
            };
            cachedfun.__cache = (function(){
                cache.remove || (cache.remove = function(){
                    var hash = stringifyJson(arguments);
                    return (delete cache[hash]);
                });
                return cache;
            }).call(this);
            return cachedfun;
        } : function (func) {
        return func;
    }));
}(this));