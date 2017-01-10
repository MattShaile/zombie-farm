goog.provide('com.epic.zfarm.zombie.v.event.ZombieEvent');




/**
 * @constructor
 * @param {Number}
 */
function ZombieEvent(type, target, id) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;

    /**
     * @type {Number}
     */
    this.id = id;
};

/**
 * @returns {Number}
 */
ZombieEvent.prototype.getId = function () {
    return this.id;
};

/**
 * @type {string}
 */
ZombieEvent.EVENT_FRONT_ZOMBIE_CHANGED = "eventFrontZombieChanged";
ZombieEvent.EVENT_ZOMBIE_DIED = "eventZombieDied";