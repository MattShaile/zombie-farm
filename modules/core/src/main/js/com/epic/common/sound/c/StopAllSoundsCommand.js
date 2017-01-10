goog.provide('com.epic.common.sound.c.StopAllSoundsCommand');

goog.require('com.epic.common.sound.SoundManager');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function StopAllSoundsCommand() {
}

goog.inherits(StopAllSoundsCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
StopAllSoundsCommand.prototype.execute = function (note) {
    var sm = SoundManager.getInstance();
    sm.stopAllSounds();
};