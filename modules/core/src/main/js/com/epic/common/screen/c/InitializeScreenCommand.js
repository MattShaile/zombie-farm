goog.provide('com.epic.common.screen.c.InitializeScreenCommand');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitializeScreenCommand() {
}

goog.inherits(InitializeScreenCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
InitializeScreenCommand.prototype.execute = function (note) {
    this.facade.sendNotification(ScreenConstants.DO_INITIALIZE);
};