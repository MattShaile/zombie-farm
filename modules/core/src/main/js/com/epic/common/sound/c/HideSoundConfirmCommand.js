goog.provide('com.epic.common.sound.c.HideSoundConfirmCommand');

goog.require('com.epic.common.sound.SoundConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideSoundConfirmCommand() {
}

goog.inherits(HideSoundConfirmCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
HideSoundConfirmCommand.prototype.execute = function (note) {
    try {
        var el = document.documentElement, rfs =
                el.requestFullScreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
            ;
        rfs.call(el);
    } catch (e) {

    }

    this.sendNotification(SoundConstants.DO_HIDE_SOUND_CONFIRM, {});
};