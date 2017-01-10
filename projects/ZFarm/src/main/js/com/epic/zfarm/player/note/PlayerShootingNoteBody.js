goog.provide('com.epic.zfarm.player.note.PlayerShootingNoteBody');




/**
 * @constructor
 * @param shooting {Boolean}
 */
function PlayerShootingNoteBody(shooting) {
    this.shooting = shooting;
};

/**
 * @returns {Boolean}
 */
PlayerShootingNoteBody.prototype.getShooting = function () {
    return this.shooting;
};

PlayerShootingNoteBody.DO_SET_SHOOTING = "doPlayerSetShooting";