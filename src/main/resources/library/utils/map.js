var _ns = _ns || {};
_ns.Core = _ns.Core || {};
_ns.Core.Utils = _ns.Core.Utils || {};

/**
 * @class _ns.Core.Utils.MapUtils
 * @static
 **/
_ns.Core.Utils.MapUtils = (function () {
    return {
        /**
         * returns the value in map that matches the passed in property.
         * also supports dotted properties.
         * @param {Obj} map
         * @param {String} properties
         * @returns Obj
         * @method get
         *
         * @example
         get({name: 'Bob Pollard'}, 'name') => 'Bob Pollard'
         get({location: {state: 'OH', city: 'Dayton'}}, 'location') => { state: 'OH', city: 'Dayton' }
         get({location: {state: 'OH', city: 'Dayton'}}, 'location.city') => 'Dayton'
         **/
        get: function (map, properties) {
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
         * returns the value in map that matches the passed in property.
         * also supports dotted properties. Limited to 10 length property chain.
         * @param {Obj} map
         * @param {String} properties
         * @returns Obj
         * @method highPerformanceGet
         *
         * @example
         highPerformanceGet({name: 'Bob Pollard'}, 'name') => 'Bob Pollard'
         highPerformanceGet({location: {state: 'OH', city: 'Dayton'}}, 'location') => { state: 'OH', city: 'Dayton' }
         highPerformanceGet({location: {state: 'OH', city: 'Dayton'}}, 'location.city') => 'Dayton'
         **/
        highPerformanceGet: function (map, properties) {
            if (map && properties) {
                properties = properties.split(".");
                if (properties.length > 10) {
                    throw "You cannot pass in a string of properties greater than 10";
                }
                try {
                    switch (properties.length) {
                        case 1:
                            return map[properties[0]];
                        case 2:
                            return map[properties[0]][properties[1]];
                        case 3:
                            return map[properties[0]][properties[1]][properties[2]];
                        case 4:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]];
                        case 5:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]];
                        case 6:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]];
                        case 7:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]];
                        case 8:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]];
                        case 9:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]][properties[8]];
                        case 10:
                            return map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]][properties[8]][properties[9]];
                    }
                } catch (e) {
                    return undefined;
                }
            }
            return map;
        },
        /**
         * Applies a value to the property string on the existing map object. Returns the map.
         * @param {Obj} map
         * @param {String} properties
         * @param {Obj} value
         * @returns Obj
         * @method applyTo
         *
         * @example
         applyTo({name: 'Bob Pollard'}, 'name', 'George Jones') => {name: 'George Jones'}
         highPerformanceGet({location: {state: 'OH', city: 'Dayton'}}, 'location', { state: 'TX', city: 'Austin' }) => {location: {state: 'TX', city: 'Austin'}}
         highPerformanceGet({location: {state: 'OH', city: 'Dayton'}}, 'location.city', 'Cleveland') => {location: {state: 'OH', city: 'Cleveland'}}
         **/
        applyTo: function (map, properties, value) {
            if (map && properties) {
                properties = properties.split(".");
                if (properties.length > 10) {
                    throw "You cannot pass in a string of properties greater than 10";
                }
                switch (properties.length) {
                    case 1:
                        map[properties[0]] = value;
                        break;
                    case 2:
                        map[properties[0]][properties[1]] = value;
                        break;
                    case 3:
                        map[properties[0]][properties[1]][properties[2]] = value;
                        break;
                    case 4:
                        map[properties[0]][properties[1]][properties[2]][properties[3]] = value;
                        break;
                    case 5:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]] = value;
                        break;
                    case 6:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]] = value;
                        break;
                    case 7:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]] = value;
                        break;
                    case 8:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]] = value;
                        break;
                    case 9:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]][properties[8]] = value;
                        break;
                    case 10:
                        map[properties[0]][properties[1]][properties[2]][properties[3]][properties[4]][properties[5]][properties[6]][properties[7]][properties[8]][properties[9]] = value;
                        break;
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
        keysDistinct: function () {
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
