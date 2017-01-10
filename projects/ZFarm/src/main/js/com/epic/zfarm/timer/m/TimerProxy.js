goog.provide('com.epic.zfarm.timer.m.TimerProxy');

goog.require('com.epic.zfarm.timer.note.TimerNoteBody');
goog.require('com.epic.common.util.event.TimerEvent');
goog.require('com.epic.common.util.Timer');


function TimerProxy() {
    var dataObject = {
        "timerMS": null,
        "timer": null
    };
    puremvc.Proxy.call(this, TimerProxy.NAME, dataObject);

    // Closure scope functions
    var inst = this;

    /**
     * @type {Function}
     */
    this.timerCompleteHandler = function (e) {
        inst.timerComplete(e);
    }

    /**
     * @type {Function}
     */
    this.timerUpdateHandler = function (e) {
        inst.timerUpdate(e);
    }
}

goog.inherits(TimerProxy, puremvc.Proxy);

TimerProxy.NAME = "TimerProxy";

/**
 * @param ms {Number}       Number of milliseconds to wait. Will be converted to frames
 */
TimerProxy.prototype.startTimer = function (ms) {
    this.data.timerMS = ms;

    this.stopTimer();

    this.data.timer = new Timer(ms / 100, 100);
    this.data.timer.addEventListener(TimerEvent.CHANGE, this.timerUpdateHandler);
    this.data.timer.addEventListener(TimerEvent.COMPLETE, this.timerCompleteHandler);

    this.data.timer.start();
};

/**
 */
TimerProxy.prototype.stopTimer = function () {
    if (this.data.timer) {
        this.data.timer.removeEventListener(TimerEvent.CHANGE, this.timerUpdateHandler);
        this.data.timer.removeEventListener(TimerEvent.COMPLETE, this.timerCompleteHandler);

        this.data.timer.stop();

        this.data.timer = null;
    }
};

/**
 *
 */
TimerProxy.prototype.timerUpdate = function (e) {
    this.facade.sendNotification(TimerNoteBody.DO_UPDATE_PERCENT, new TimerNoteBody(e.currentCount));
};

/**
 *
 */
TimerProxy.prototype.timerComplete = function (e) {
    this.facade.sendNotification(TimerNoteBody.DO_UPDATE_PERCENT, new TimerNoteBody(100));

    this.facade.sendNotification(TimerNoteBody.WHEN_COMPLETE, new TimerNoteBody(100));
};