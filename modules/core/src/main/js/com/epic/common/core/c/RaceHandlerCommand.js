goog.provide('com.epic.common.core.c.RaceHandlerCommand');

goog.require('com.epic.common.core.m.RaceHandlerProxy');


/**
 * Increases the amount of finishers in the race proxy
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function RaceHandlerCommand() {
}

goog.inherits(RaceHandlerCommand, puremvc.SimpleCommand);

/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
RaceHandlerCommand.prototype.execute = function (note) {
    var raceHandlerProxy = this.facade.retrieveProxy(RaceHandlerProxy.NAME);
    raceHandlerProxy.finished();
};