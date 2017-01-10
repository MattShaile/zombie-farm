goog.provide('com.epic.zfarm.player.c.PlayerEnterCommand');

goog.require('com.epic.zfarm.player.note.PlayerMoveNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerEnterCommand() {
}

goog.inherits(PlayerEnterCommand, puremvc.SimpleCommand);

PlayerEnterCommand.prototype.execute = function (note) {
    this.sendNotification(PlayerMoveNoteBody.DO_PLAYER_SNAP_TO, new PlayerMoveNoteBody(-100));
    this.sendNotification(PlayerMoveNoteBody.DO_PLAYER_MOVE, new PlayerMoveNoteBody(400));
};