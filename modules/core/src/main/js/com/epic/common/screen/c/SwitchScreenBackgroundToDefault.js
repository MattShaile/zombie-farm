goog.provide('com.epic.common.screen.c.SwitchScreenBackgroundToDefault');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function SwitchScreenBackgroundToDefault() {
}

goog.inherits(SwitchScreenBackgroundToDefault, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
SwitchScreenBackgroundToDefault.prototype.execute = function (note) {
    this.facade.sendNotification(ScreenConstants.DO_SWITCH_BACKGROUND, {"src":"gameBG"});
};