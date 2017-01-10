goog.provide('com.epic.zfarm.zombie.note.ZombieIDNoteBody');




/**
 * @constructor
 * @param id {Number}
 */
function ZombieIDNoteBody(id) {
    this.id = id;
};

ZombieIDNoteBody.WHEN_FRONT_ZOMBIE_CHANGED = "whenFrontZombieChanged";
ZombieIDNoteBody.WHEN_ZOMBIE_DEAD = "whenZombieDead";

ZombieIDNoteBody.DO_HURT_ZOMBIE = "doHurtZombie";
ZombieIDNoteBody.DO_KILL_ZOMBIE = "doKillZombie";

/**
 * @returns {Number}
 */
ZombieIDNoteBody.prototype.getUniqueID = function () {
    return this.id;
};