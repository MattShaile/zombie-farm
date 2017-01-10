goog.provide('com.epic.zfarm.timer.note.TimerPositionNoteBody');




/**
 * @param x {Number}
 * @constructor
 */
function TimerPositionNoteBody(x) {
    /**
     * @type {Number}
     */
    this.x = x;
};

TimerPositionNoteBody.DO_SET_X = "doTimerSetX";