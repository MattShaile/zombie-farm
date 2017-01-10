goog.provide('com.epic.common.sound.c.ShowSoundTabCommand');

goog.require('com.epic.common.sound.SoundConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowSoundTabCommand() {
}

goog.inherits(ShowSoundTabCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ShowSoundTabCommand.prototype.execute = function (note) {
    this.facade.sendNotification(SoundConstants.DO_SHOW_SOUND_TAB, {});
};