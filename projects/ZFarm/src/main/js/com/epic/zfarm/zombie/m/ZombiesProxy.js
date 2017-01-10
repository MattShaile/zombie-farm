goog.provide('com.epic.zfarm.zombie.m.ZombiesProxy');

goog.require('com.epic.zfarm.zombie.m.vo.ZombieConfigVO');
goog.require('com.epic.zfarm.zombie.m.vo.ZombieVO');
goog.require('com.epic.zfarm.zombie.note.ZombieNoteBody');
goog.require('com.epic.common.util.event.TimerEvent');
goog.require('com.epic.common.util.Timer');


function ZombiesProxy() {
    var dataObject = {
        "zombies": [],
        "closestZombieID": null
    };
    puremvc.Proxy.call(this, ZombiesProxy.NAME, dataObject);
}

goog.inherits(ZombiesProxy, puremvc.Proxy);

ZombiesProxy.NAME = "ZombiesProxy";

/**
 * Starts spawning zombies at a set interval
 * @param numZombies {Number}       Total number of zombies to spawn
 * @param delay {Number}            Time in ms between zombie spawns
 */
ZombiesProxy.prototype.startSpawnTimer = function (numZombies, delay) {
    var inst = this;

    console.log(numZombies + " ,, " + delay);

    var timer = new Timer(delay, numZombies);

    timer.addEventListener(TimerEvent.CHANGE, function (e) {
        inst.spawnZombie(e);
    });

    timer.start();
};

/**
 * Spawn a zombie
 * @param e {TimerEvent}
 */
ZombiesProxy.prototype.spawnZombie = function (e) {
    this.facade.sendNotification(ZombieNoteBody.WHEN_ADD_ZOMBIE, new ZombieNoteBody());
};

/**
 * Adds a zombie
 * @param zombieConfigVO {ZombieConfigVO}
 * @return {Number}     A unique zombie id
 */
ZombiesProxy.prototype.addZombie = function (zombieConfigVO) {
    var uniqueID = 0;

    var unique = false;

    while (!unique) {
        unique = true;

        uniqueID++;

        for (var i in this.data.zombies) {
            if (this.data.zombies[i].id == uniqueID) {
                unique = false;
                break;
            }
        }
    }

    var zombieVO = new ZombieVO(uniqueID, zombieConfigVO.hp);

    this.data.zombies.push(zombieVO);

    return uniqueID;
};

/**
 * Gets the zombies closest to the left (whichever spawned first since we're assuming they all move at the same speed)
 * @returns {ZombieVO}
 */
ZombiesProxy.prototype.getClosestZombie = function () {
    /**
     * @type {ZombieVO}
     */
    var zombieVO = null;

    for (var i in this.data.zombies) {
        zombieVO = this.data.zombies[i];

        if (zombieVO.id == this.data.closestZombieID) {
            break;
        } else {
            zombieVO = null;
        }
    }

    return zombieVO;
};

/**
 * @param id {Number}
 */
ZombiesProxy.prototype.setClosestZombie = function (id) {
    this.data.closestZombieID = id;
};

/**
 * Removes the zombies closest to the left (whichever spawned first since we're assuming they all move at the same speed)
 * @returns {*}
 */
ZombiesProxy.prototype.clearClosestZombie = function () {
    this.data.closestZombieID = null;
};

/**
 * Removes a specified zombie
 * @returns {*}
 */
ZombiesProxy.prototype.removeZombie = function (id) {
    /**
     * @type {ZombieVO}
     */
    var zombieVO = null;

    for (var i in this.data.zombies) {
        zombieVO = this.data.zombies[i];

        if (zombieVO.id == id) {
            this.data.zombies[i] = null;
            delete this.data.zombies[i];
            break;
        }
    }
};


