goog.provide('com.epic.zfarm.timer.note.TimerNoteBody');




/**
 * @param percent {Number}
 * @constructor
 */
function TimerNoteBody(percent) {
    /**
     * @type {Number}
     */
    this.percent = percent;
};

TimerNoteBody.DO_UPDATE_PERCENT = "doTimerUpdatePercent";
TimerNoteBody.DO_START = "doTimerStart";
TimerNoteBody.DO_HIDE = "doTimerHide";
TimerNoteBody.DO_SHOW = "doTimerShow";

TimerNoteBody.WHEN_COMPLETE = "whenTimerComplete";