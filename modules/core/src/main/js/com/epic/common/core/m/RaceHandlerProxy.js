goog.provide('com.epic.common.core.m.RaceHandlerProxy');




/**
 * Generic race handler. Once runners meets the finishers requirement the specified notification is sent
 *
 * @extends {puremvc.Proxy}
 * @constructor
 */
function RaceHandlerProxy() {
    var data = {
        "runners": 0,
        "finishers": 0,
        "noteName": ""
    };

    puremvc.Proxy.call(this, RaceHandlerProxy.NAME, data);
}

goog.inherits(RaceHandlerProxy, puremvc.Proxy);

/**
 * Proxy NAME constant
 * @const
 * @type string
 */
RaceHandlerProxy.NAME = "RaceHandlerProxy";

/**
 * Reset the race handler
 * @param runners
 * @param noteName
 */
RaceHandlerProxy.prototype.setupRaceHandler = function (runners, noteName) {
    this.data.finishers = 0;
    this.data.runners = runners;
    this.data.noteName = noteName;
};

RaceHandlerProxy.prototype.finished = function () {
    this.data.finishers++;

    if (this.data.finishers >= this.data.runners) {
        this.facade.sendNotification(this.data.noteName);
    }
};