var Neosavvy = Neosavvy || {};
Neosavvy.Core = Neosavvy.Core || {};
Neosavvy.Core.Utils = Neosavvy.Core.Utils || {};

Neosavvy.Core.Utils.DateUtils = (function () {
    var DAY_IN_MILLISECONDS = (24 * 60 * 60 * 1000);

    return {
        DAY_IN_MILLISECONDS:DAY_IN_MILLISECONDS,
        sameDay:function (dateA, dateB) {
            if (dateA && dateB) {
                if (dateA.getDay() == dateB.getDay()) {
                    return (dateA.getTime() >= (dateB.getTime() - DAY_IN_MILLISECONDS)) && (dateA.getTime() <= (dateB.getTime() + DAY_IN_MILLISECONDS));
                }
            }
            return false
        },
        daysFromNow:function (days) {
            return new Date(new Date().getTime() + (days * (24 * 60 * 60 * 1000)));
        }
    };

})();