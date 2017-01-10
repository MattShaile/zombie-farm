goog.provide('com.epic.zfarm.player.note.PlayerMoveNoteBody');




/**
 * @constructor
 * @param x {Number}
 */
function PlayerMoveNoteBody(x) {
    this.x = x;
};

/**
 * @returns {Number}
 */
PlayerMoveNoteBody.prototype.getX = function () {
    return this.x;
};


PlayerMoveNoteBody.DO_PLAYER_SNAP_TO = "doPlayerSnapTo";
PlayerMoveNoteBody.DO_PLAYER_SCREEN_SNAP = "doPlayerScreenSnap";
PlayerMoveNoteBody.DO_PLAYER_MOVE = "doPlayerMove";