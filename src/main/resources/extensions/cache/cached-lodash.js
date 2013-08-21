(function (window, _) {
    if (_ && memoize) {
        window._cached = window._cached || {};
        for (var fn in _) {
            //No need to re-cache the memoization function in Lodash
            if (fn !== "memoize") {
                window._cached[fn] = memoize(_[fn]);
            }
        }
    } else {
        throw "Either Lodash or global memoize has not been loaded within this application. Please load these files before cached-lodash.js";
    }
})(window, window._);