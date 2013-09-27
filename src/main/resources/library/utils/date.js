
var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

/**
 * @class Neosavvy.Core.Utils.DateUtils
 * @static
 **/
Neosavvy.Core.Utils.DateUtils = (function () {
    var DAY_IN_MILLISECONDS = (24 * 60 * 60 * 1000);

    return {
        /**
         * returns the length of a day in milliseconds
         * @property DAY_IN_MILLISECONDS
         * @returns int
         **/
        DAY_IN_MILLISECONDS:DAY_IN_MILLISECONDS,

        /**
         * returns true if dateA and dateB are within the same day
         * @param {DateTime} dateA
         * @param {DateTime} dateB
         * @returns boolean
         * @method sameDay
         **/
        sameDay:function (dateA, dateB) {
            if (dateA && dateB) {
                if (dateA.getDay() == dateB.getDay()) {
                    return (dateA.getTime() >= (dateB.getTime() - DAY_IN_MILLISECONDS)) && (dateA.getTime() <= (dateB.getTime() + DAY_IN_MILLISECONDS));
                }
            }
            return false
        },

        /**
         * returns the number of days from now until the passed in day
         * @param {DateTime} days
         * @returns integer
         * @method daysFromNow
         **/
        daysFromNow:function (days) {
            return new Date(new Date().getTime() + (days * (24 * 60 * 60 * 1000)));
        }
    };

})();
