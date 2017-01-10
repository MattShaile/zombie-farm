goog.provide('com.epic.zfarm.zombie.v.component.ZombieComponent');

goog.require('com.epic.zfarm.player.v.skin.PlayerSkin');
goog.require('com.epic.zfarm.zombie.v.event.ZombieEvent');
goog.require('com.epic.zfarm.zombie.v.skin.ZombieSkin');


/**
 * @constructor
 * @param   skin {ZombieSkin}
 * @param   speed {Number}
 */
function ZombieComponent(skin, speed) {
    createjs.EventDispatcher.initialize(ZombieComponent.prototype);

    createjs.Ticker.addEventListener("tick", this);

    /**
     * @type {PlayerSkin}
     */
    this.skin = skin;

    /**
     * @type {number}
     */
    this.targetX = 0;

    /**
     * @type {Boolean}
     */
    this.targetSet = false;

    /**
     * @type {number}
     */
    this.currentX = 0;

    /**
     * @type {number}
     */
    this.speed = speed;

    this.skin.addEventListener(ZombieEvent.EVENT_ZOMBIE_DIED, this);
};

ZombieComponent.prototype.handleEvent = function (e) {
    if (e.type == "tick") {
        this.update();
    } else if (e.type == ZombieEvent.EVENT_ZOMBIE_DIED) {
        this.zombieDead();
    }
};

/**
 * Moves the player
 * @param x {Number}
 */
ZombieComponent.prototype.move = function (x) {
    this.targetSet = true;

    this.targetX = x;
};

/**
 * Instantly moves the player to specified x
 * @param x {Number}
 */
ZombieComponent.prototype.snapTo = function (x) {
    this.targetX = this.currentX = x;
    this.update();
};

/**
 * The zombie was shot
 */
ZombieComponent.prototype.shot = function () {
    this.skin.changeState(ZombieSkin.STATE_SHOT);
};

/**
 * Every frame
 */
ZombieComponent.prototype.update = function () {
    if (this.skin.getProperty(ZombieSkin.PROPERTY_CAN_MOVE)) {
        if (Math.abs(this.currentX - this.targetX) < this.speed) {
            this.currentX = this.targetX;

            if (this.targetSet) {
                this.targetSet = false;

                //this.dispatchEvent({"type": ZombieComponent.EVENT_TARGET_REACHED, "target": this});
            }

            this.skin.changeState(ZombieSkin.STATE_ATTACK);

        } else {
            this.currentX -= this.speed;

            this.skin.setProperty("x", this.currentX);
            this.skin.changeState(ZombieSkin.STATE_WALK);
        }
    }
};

ZombieComponent.prototype.die = function () {
    this.dieing = true;

    this.skin.changeState(ZombieSkin.STATE_DEAD);

    createjs.Ticker.removeEventListener("tick", this);
};

ZombieComponent.prototype.getY = function () {
    return this.skin.getProperty("y");
};

ZombieComponent.prototype.zombieDead = function () {
    this.dispatchEvent(new ZombieEvent(ZombieEvent.EVENT_ZOMBIE_DIED, this, null));
};

ZombieComponent.prototype.destroy = function () {
    this.skin.removeEventListener(ZombieEvent.EVENT_ZOMBIE_DIED, this);

    this.skin.destroy();
    this.skin = null;
};

ZombieComponent.EVENT_TARGET_REACHED = "eventTargetReached";