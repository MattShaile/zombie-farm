goog.provide('com.epic.common.sound.c.MuteChangedCommand');

goog.require('com.epic.common.sound.SoundConstants');
goog.require('com.epic.common.sound.SoundManager');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function MuteChangedCommand() {
}

goog.inherits(MuteChangedCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
MuteChangedCommand.prototype.execute = function (note) {
    var targetVolume = note.getBody().mute ? 0 : 1;
    var currentVolume = SoundManager.getInstance().root.mixer.volume;

    SoundManager.getInstance().root.mixer.setVolume(targetVolume);

    if (currentVolume != targetVolume) {
        this.facade.sendNotification(SoundConstants.DO_UPDATE_MUTE, {"mute": note.getBody().mute});
    }


};