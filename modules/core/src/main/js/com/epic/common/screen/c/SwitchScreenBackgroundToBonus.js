goog.provide('com.epic.common.screen.c.SwitchScreenBackgroundToBonus');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function SwitchScreenBackgroundToBonus() {
}

goog.inherits(SwitchScreenBackgroundToBonus, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
SwitchScreenBackgroundToBonus.prototype.execute = function (note) {
    this.facade.sendNotification(ScreenConstants.DO_SWITCH_BACKGROUND, {"src": "bonusBG"});
};