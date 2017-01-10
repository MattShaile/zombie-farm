goog.provide('com.epic.zfarm.zombie.note.ZombieComponentNoteBody');

goog.require('com.epic.zfarm.zombie.v.component.ZombieComponent');


/**
 * @constructor
 * @param id {Number}
 * @param zombieComponent {ZombieComponent}
 */
function ZombieComponentNoteBody(id, zombieComponent) {
    this.id = id;
    this.zombieComponent = zombieComponent;
};

ZombieComponentNoteBody.DO_ADD_ZOMBIE = "doAddZombie";

/**
 * @returns {Number}
 */
ZombieComponentNoteBody.prototype.getUniqueID = function () {
    return this.id;
};

/**
 * @returns {ZombieComponent}
 */
ZombieComponentNoteBody.prototype.getZombieComponent = function () {
    return this.zombieComponent;
};