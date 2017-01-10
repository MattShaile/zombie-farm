goog.provide('com.epic.common.util.event.TimerEvent');




/**
 * @constructor
 */
function TimerEvent(type, target, currentCount, totalCount) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;

    /**
     * @type {Number}
     */
    this.currentCount = currentCount;

    /**
     * @type {Number}
     */
    this.totalCount = totalCount;
};

TimerEvent.CHANGE = "timerUtilChanged";
TimerEvent.COMPLETE = "timerUtilComplete";