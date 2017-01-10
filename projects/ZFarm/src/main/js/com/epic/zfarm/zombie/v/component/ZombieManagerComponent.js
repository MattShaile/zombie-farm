goog.provide('com.epic.zfarm.zombie.v.component.ZombieManagerComponent');

goog.require('com.epic.zfarm.zombie.v.component.ZombieComponent');
goog.require('com.epic.zfarm.zombie.v.event.ZombieEvent');


/**
 * @constructor
 */
function ZombieManagerComponent(container) {
    createjs.EventDispatcher.initialize(ZombieManagerComponent.prototype);

    this.zombies = [];

    this.container = container;

    this.frontZombieID = null;

    createjs.Ticker.addEventListener("tick", this);
};

ZombieManagerComponent.prototype.handleEvent = function (e) {
    if (e.type == "tick") {
        this.update();
    } else if (e.type == ZombieEvent.EVENT_ZOMBIE_DIED) {
        this.zombieDead(e);
    }
};

/**
 * @param id {Number}
 * @param zombie {ZombieComponent}
 */
ZombieManagerComponent.prototype.addZombie = function (id, zombie) {
    zombie.skin.addToContainer(this.container);

    this.zombies[id] = zombie;

    zombie.addEventListener(ZombieEvent.EVENT_ZOMBIE_DIED, this);

    this.updateDepths();
};

/**
 * @param id {Number}
 */
ZombieManagerComponent.prototype.hurtZombie = function (id) {
    /**
     * @type {ZombieComponent}
     */
    var zombie = this.zombies[id];

    zombie.shot();
};

/**
 * @param id {Number}
 */
ZombieManagerComponent.prototype.killZombie = function (id) {
    /**
     * @type {ZombieComponent}
     */
    var zombie = this.zombies[id];

    zombie.die();

    this.frontZombieID = null;
    this.checkClosestZombie();
};

ZombieManagerComponent.prototype.update = function () {
    this.checkClosestZombie();
};

ZombieManagerComponent.prototype.updateDepths = function () {
    var depthArr = [];

    /**
     * @type {ZombieComponent}
     */
    var zombie = null;

    for (var i in this.zombies) {
        zombie = this.zombies[i];

        for (var j = 0; j < depthArr.length; j++) {
            if (depthArr[j].getY() > zombie.getY()) {
                break;
            }
        }

        depthArr.splice(j, 0, zombie);
    }

    for (i = 0; i < depthArr.length; i++) {
        depthArr[i].skin.addToContainer(this.container);
    }
};

ZombieManagerComponent.prototype.checkClosestZombie = function () {
    /**
     * @type {ZombieComponent}
     */
    var zombie = null;

    var frontZombieId = -1;
    var frontZombiePosition = 10000;

    for (var i in this.zombies) {
        zombie = this.zombies[i];

        if (zombie && !zombie.dieing) {
            if (zombie.currentX < frontZombiePosition) {
                frontZombieId = i;
                frontZombiePosition = zombie.currentX;
            }
        }
    }

    if (frontZombieId != -1 && frontZombieId != this.frontZombieID) {
        this.frontZombieID = frontZombieId;

        this.dispatchEvent(new ZombieEvent(ZombieEvent.EVENT_FRONT_ZOMBIE_CHANGED, this, frontZombieId));
    }
};

ZombieManagerComponent.prototype.zombieDead = function (e) {
    /**
     * @type {ZombieComponent}
     */
    var zombie = null;

    for (var id in this.zombies) {
        zombie = this.zombies[id];

        if (zombie == e.target) {
            break;
        } else {
            zombie = null;
        }
    }

    zombie.destroy();
    this.zombies[id] = null;
    delete this.zombies[id];

    this.dispatchEvent(new ZombieEvent(ZombieEvent.EVENT_ZOMBIE_DIED, this, id));
};