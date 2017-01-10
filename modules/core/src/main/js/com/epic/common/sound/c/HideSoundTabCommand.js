goog.provide('com.epic.common.sound.c.HideSoundTabCommand');

goog.require('com.epic.common.sound.SoundConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideSoundTabCommand() {
}

goog.inherits(HideSoundTabCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
HideSoundTabCommand.prototype.execute = function (note) {
    this.facade.sendNotification(SoundConstants.DO_HIDE_SOUND_TAB, {});
};