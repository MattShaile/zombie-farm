goog.provide('com.epic.common.core.m.DelayedNotificationProxy');




/**
 * Waits for a specified ammount of time to elapse and then sends a specified notification
 *
 * @extends {puremvc.Proxy}
 * @constructor
 */
function DelayedNotificationProxy() {
    var data = {
        "delay": 0,
        "noteName": "",
        "timer": 0
    };

    puremvc.Proxy.call(this, DelayedNotificationProxy.NAME, data);
}

goog.inherits(DelayedNotificationProxy, puremvc.Proxy);

/**
 * Proxy NAME constant
 * @const
 * @type string
 */
DelayedNotificationProxy.NAME = "DelayedNotificationProxy";

/**
 * Start the delayed notification
 * @param delay {Number}
 * @param noteName {String}
 */
DelayedNotificationProxy.prototype.start = function (delay, noteName) {
    var inst = this;

    this.timerCompleteHandler = null;
    this.timerCompleteHandler = function () {
        inst.complete();
    }

    this.data.delay = delay;
    this.data.noteName = noteName;

    this.data.timer = setTimeout(this.timerCompleteHandler, delay);
};

/**
 * Cancels the delayed notification
 */
DelayedNotificationProxy.prototype.cancel = function () {
    clearTimeout(this.data.timer);
    this.timerCompleteHandler = null;
};

/**
 * Called when the delay is complete. Dispatches the specified notification
 */
DelayedNotificationProxy.prototype.complete = function () {
    this.cancel();

    this.facade.sendNotification(this.data.noteName);
};