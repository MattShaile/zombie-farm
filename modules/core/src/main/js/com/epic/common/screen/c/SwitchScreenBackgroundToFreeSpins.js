goog.provide('com.epic.common.screen.c.SwitchScreenBackgroundToFreeSpins');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function SwitchScreenBackgroundToFreeSpins() {
}

goog.inherits(SwitchScreenBackgroundToFreeSpins, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
SwitchScreenBackgroundToFreeSpins.prototype.execute = function (note) {
    this.facade.sendNotification(ScreenConstants.DO_SWITCH_BACKGROUND, {"src": "fsBG"});
};