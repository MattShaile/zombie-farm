goog.provide('com.epic.common.screen.c.ScreenGameModeCommand');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ScreenGameModeCommand() {
}

goog.inherits(ScreenGameModeCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ScreenGameModeCommand.prototype.execute = function (note) {
    this.facade.sendNotification(ScreenConstants.DO_SET_MODE, {"mode": ScreenConstants.GAME_MODE});
};