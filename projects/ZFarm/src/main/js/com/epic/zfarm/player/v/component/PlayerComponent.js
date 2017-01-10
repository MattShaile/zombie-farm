goog.provide('com.epic.zfarm.player.v.component.PlayerComponent');

goog.require('com.epic.zfarm.player.v.skin.PlayerSkin');


/**
 * @constructor
 * @param   skin {PlayerSkin}
 */
function PlayerComponent(skin) {
    createjs.EventDispatcher.initialize(PlayerComponent.prototype);

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
     * @type {boolean}
     */
    this.shooting = false;

    /**
     * @type {boolean}
     */
    this.firing = false;

    /**
     * @type {number}
     */
    this.speed = 10;
};

PlayerComponent.prototype.handleEvent = function (e) {
    if (e.type == "tick") {
        this.update();
    }
};

/**
 * Moves the player
 * @param x {Number}
 */
PlayerComponent.prototype.move = function (x) {
    this.targetSet = true;

    this.targetX = x;

    if (!this.skin.getProperty(PlayerSkin.PROPERTY_CAN_MOVE)) {
        this.skin.changeState(PlayerSkin.STATE_IDLE);
    }
};

/**
 * Makes the player perform an action animtion
 * @param itemFrame {String}
 */
PlayerComponent.prototype.action = function (itemFrame) {
    this.skin.setProperty(PlayerSkin.PROPERTY_TOOL, itemFrame);
    this.skin.changeState(PlayerSkin.STATE_ACTION);
};

/**
 * @param shooting {Boolean}
 */
PlayerComponent.prototype.setShooting = function (shooting) {
    this.shooting = shooting;
};

/**
 * Makes the player go idle
 */
PlayerComponent.prototype.idle = function () {
    this.targetSet = false;
    this.targetX = this.currentX;

    this.skin.changeState(PlayerSkin.STATE_IDLE);

    if (this.shooting) {
        this.skin.changeState(PlayerSkin.STATE_SHOOTING_IDLE);
    }
};

/**
 * Makes the player shoot
 */
PlayerComponent.prototype.shoot = function () {
    this.skin.changeState(PlayerSkin.STATE_SHOOTING);
};

/**
 * Makes the player shoot
 */
PlayerComponent.prototype.fire = function () {
    this.firing = true;
};

/**
 * Instantly moves the player to specified x
 * @param x {Number}
 */
PlayerComponent.prototype.snapTo = function (x) {
    this.targetX = this.currentX = x;
    this.update();
};

/**
 * Move only if the player is far away from the edge
 * @param x {Number}
 */
PlayerComponent.prototype.screenSnap = function (x) {
    if (this.currentX > x + 100) {
        x += 100;
    } else if (this.currentX < x - 100) {
        x -= 100;
    } else {
        return;
    }

    this.targetSet = false;
    this.targetX = this.currentX = x;
    this.update();
};

/**
 * Every frame
 */
PlayerComponent.prototype.update = function () {
    if (this.firing) {
        if (this.skin.getProperty(PlayerSkin.PROPERTY_CAN_FIRE)) {
            this.skin.changeState(PlayerSkin.STATE_FIRING);
            this.skin.changeState(PlayerSkin.STATE_SHOOTING_IDLE);
            this.firing = false;
        }
    }

    if (Math.abs(this.currentX - this.targetX) < this.speed) {
        this.currentX = this.targetX;

        if (this.targetSet) {
            if (this.shooting) {
                this.skin.changeState(PlayerSkin.STATE_SHOOTING_IDLE);
            } else {
                this.skin.changeState(PlayerSkin.STATE_IDLE);
            }
            if (this.skin.getProperty(PlayerSkin.PROPERTY_CAN_MOVE)) {
                this.targetSet = false;

                this.dispatchEvent({"type": PlayerComponent.EVENT_TARGET_REACHED, "target": this});
            }
        }

    } else {
        if (this.skin.getProperty(PlayerSkin.PROPERTY_CAN_MOVE)) {
            this.skin.changeState(PlayerSkin.STATE_WALKING);

            var direction = this.targetX < this.currentX ? -1 : 1;

            this.skin.setProperty(PlayerSkin.PROPERTY_SCALE_X, direction);

            if (this.skin.getProperty(PlayerSkin.PROPERTY_CAN_MOVE)) {
                this.currentX += this.speed * direction;

                this.skin.setProperty("x", this.currentX);
            }
        }
    }
};

PlayerComponent.prototype.destroy = function () {
    createjs.Ticker.removeEventListener("tick", this);
};

PlayerComponent.EVENT_TARGET_REACHED = "eventTargetReached";