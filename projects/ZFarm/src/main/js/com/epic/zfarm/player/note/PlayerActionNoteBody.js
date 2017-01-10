goog.provide('com.epic.zfarm.player.note.PlayerActionNoteBody');




/**
 * @constructor
 * @param action {String}
 */
function PlayerActionNoteBody(action) {
    this.action = action;
};

/**
 * @returns {String}
 */
PlayerActionNoteBody.prototype.getAction = function () {
    return this.action;
};

PlayerActionNoteBody.DO_ACTION = "doPlayerAction";