goog.provide('com.epic.zfarm.player.v.skin.PlayerSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @extends {EaselSkin}
 * @param {EaselManifest} manifest
 */
function PlayerSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.playerSprite = null;

    /**
     * @type {String}
     */
    this.currentToolID = "";
}

goog.inherits(PlayerSkin, EaselSkin);


/**
 * Init the skin
 */
PlayerSkin.prototype.init = function () {
    this.playerSprite = new createjs.Sprite(this.manifest.getSpriteSheet());

    this.container.addChild(this.playerSprite);

    this.changeState(PlayerSkin.STATE_IDLE);

    var inst = this;
    this.animationEndHandler = function (e) {
        inst.animationEnd(e);
    };

    this.playerSprite.addEventListener("animationend", this.animationEndHandler);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
PlayerSkin.prototype.changeState = function (state) {
    if (this.currentState != state) {
        switch (state) {
            case PlayerSkin.STATE_SHOOTING_IDLE:
                if (this.currentState != PlayerSkin.STATE_FIRING) {
                    this.playerSprite.gotoAndPlay("idleShoot");
                }
                break;
            case PlayerSkin.STATE_FIRING:
                this.playerSprite.gotoAndPlay("shootPistol");
                break;
            case PlayerSkin.STATE_IDLE:
                if (this.currentState == PlayerSkin.STATE_WALKING) {
                    this.playerSprite.gotoAndPlay("endRun");
                } else if (this.currentState == PlayerSkin.STATE_ACTION) {
                    this.playerSprite.gotoAndPlay(this.currentToolID + "Out");
                } else {
                    this.playerSprite.gotoAndPlay("idle");
                }
                break;
            case PlayerSkin.STATE_ACTION:
                this.playerSprite.gotoAndPlay(this.currentToolID + "In");
                break;
            case PlayerSkin.STATE_SHOOTING:
                this.playerSprite.gotoAndPlay("pistolIn");
                break;
            case PlayerSkin.STATE_WALKING:
                this.playerSprite.gotoAndPlay("return");
                break;
        }
    }

    goog.base(this, "changeState", state);
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
PlayerSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case PlayerSkin.PROPERTY_TOOL:
            this.currentToolID = value;
            break;
        case PlayerSkin.PROPERTY_SCALE_X:
            this.playerSprite.scaleX = value;
            break;
    }
};

PlayerSkin.prototype.getProperty = function (name) {
    goog.base(this, "getProperty", name);

    switch (name) {
        case PlayerSkin.PROPERTY_CAN_MOVE:
            return this.playerSprite.currentAnimation == "idle" || this.playerSprite.currentAnimation == "idleShoot" || this.playerSprite.currentAnimation == "run" || this.playerSprite.currentAnimation == "beginRun";
            break;
        case PlayerSkin.PROPERTY_CAN_FIRE:
            return this.playerSprite.paused;
            break;
    }
};

/**
 * @param e {createjs.Event}
 */
PlayerSkin.prototype.animationEnd = function (e) {
    if (this.playerSprite.currentAnimation == "shootPistol") {
        this.playerSprite.gotoAndStop(this.playerSprite.currentFrame - this.playerSprite.currentAnimationFrame + 1);
    } else if (this.playerSprite.currentAnimation == "pistolIn") {
        this.playerSprite.gotoAndStop(this.playerSprite.currentFrame + 1);
    }
};

/**
 * @type {string}
 */
PlayerSkin.STATE_IDLE = "idle";

/**
 * @type {string}
 */
PlayerSkin.STATE_ACTION = "action";

/**
 * @type {string}
 */
PlayerSkin.STATE_SHOOTING = "shooting";

/**
 * @type {string}
 */
PlayerSkin.STATE_FIRING = "firing";

/**
 * @type {string}
 */
PlayerSkin.STATE_SHOOTING_IDLE = "shootingIdle";

/**
 * @type {string}
 */
PlayerSkin.STATE_WALKING = "walking";

/**
 * @type {string}
 */
PlayerSkin.PROPERTY_TOOL = "tool";

/**
 * @type {string}
 */
PlayerSkin.PROPERTY_SCALE_X = "scaleX";

/**
 * If the player is doing a turning animation, they shouldn't be able to move
 * @type {string}
 */
PlayerSkin.PROPERTY_CAN_MOVE = "canMove";

/**
 * If the player is taking out his weapon he cannot fire
 * @type {string}
 */
PlayerSkin.PROPERTY_CAN_FIRE = "canFire";