var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.MapUtils
 * @static
 **/
Neosavvy.Core.Utils.MapUtils = (function () {
    return {
        /**
         * returns the value in map that matches the passed in property.
         * also supports dotted properties.
         * @param {Obj} map
         * @param {String} properties
         * @returns Obj
         * @method itemByProperty
         *
         * @example
            get({name: 'Bob Pollard'}, 'name') => 'Bob Pollard'
            get({location: {state: 'OH', city: 'Dayton'}}, 'location') => { state: 'OH', city: 'Dayton' }
            get({location: {state: 'OH', city: 'Dayton'}}, 'location.city') => 'Dayton'
         **/
        get:function (map, properties) {
            if (map && properties) {
                properties = properties.split(".");
                while (properties.length) {
                    if (map) {
                        map = map[properties.shift()];
                    } else {
                        break;
                    }
                }
            }
            return map;
        },
        /**
         * returns true or false based on whether or not the passed
         * in set of objects all have unique keys
         *
         * @example
            keysDistinct({whoomp: 'there it is'}, {whoomp: 'here it goes'}) => false
            keysDistinct({whoomp: 'there it is'}, {tagTeam: 'back again'}) => true
         * @param {obj} arguments
         * @returns Boolean
         * @method keysDistinct
         **/
        keysDistinct:function() {
            if (arguments.length > 1) {
                var accumulatedLength = 0;
                for (var i = 0; i < arguments.length; i++) {
                    accumulatedLength += _.keys(arguments[i]).length;
                }
                return (_.keys(_.merge.apply(this, arguments)).length === accumulatedLength);
            }
            return true;
        }
    }
})();
