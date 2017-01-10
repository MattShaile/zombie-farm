goog.provide('com.epic.common.sound.c.ShowSoundConfirmCommand');

goog.require('com.epic.common.lang.Lang');
goog.require('com.epic.common.sound.SoundConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowSoundConfirmCommand() {
}

goog.inherits(ShowSoundConfirmCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ShowSoundConfirmCommand.prototype.execute = function (note) {
    this.sendNotification(SoundConstants.DO_SHOW_SOUND_CONFIRM, {"message": Lang.getPhrase("enableSounds")});
};