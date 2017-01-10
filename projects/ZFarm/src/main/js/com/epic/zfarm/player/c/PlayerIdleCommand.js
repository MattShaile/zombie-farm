goog.provide('com.epic.zfarm.player.c.PlayerIdleCommand');

goog.require('com.epic.zfarm.player.note.PlayerNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerIdleCommand() {
}

goog.inherits(PlayerIdleCommand, puremvc.SimpleCommand);

PlayerIdleCommand.prototype.execute = function (note) {
    this.facade.sendNotification(PlayerNoteBody.DO_IDLE, new PlayerNoteBody());
}