goog.provide('com.epic.zfarm.zombie.v.skin.ZombieSkin');

goog.require('com.epic.zfarm.zombie.v.event.ZombieEvent');
goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function ZombieSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.zombieSprite;
}

goog.inherits(ZombieSkin, EaselSkin);

/**
 * Init the skin
 */
ZombieSkin.prototype.init = function () {
    this.zombieSprite = new createjs.Sprite(this.manifest.getSpriteSheet());

    this.zombieSprite.gotoAndPlay("walk");

    this.container.addChild(this.zombieSprite);

    var inst = this;
    this.animationEndHandler = function (e) {
        inst.animationEnd(e);
    };

    this.deadHandler = function (e) {
        inst.getEventDispatcher().dispatchEvent(new ZombieEvent(ZombieEvent.EVENT_ZOMBIE_DIED, this, null));
    };

    this.zombieSprite.addEventListener("animationend", this.animationEndHandler);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
ZombieSkin.prototype.changeState = function (state) {
    goog.base(this, "changeState", state);

    switch (state) {
        case ZombieSkin.STATE_SHOT:
            this.zombieSprite.gotoAndPlay("hit");
            break;
        case ZombieSkin.STATE_ATTACK:
            if (this.zombieSprite.currentAnimation != "attack") {
                this.zombieSprite.gotoAndPlay("attack");
            }
            break;
        case ZombieSkin.STATE_WALK:
            if (this.zombieSprite.currentAnimation != "walk") {
                this.zombieSprite.gotoAndPlay("walk");
            }
            break;
        case ZombieSkin.STATE_DEAD:
            this.zombieSprite.gotoAndPlay("die");
            break;
    }
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
ZombieSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case "property":
            break;
    }
};

ZombieSkin.prototype.getProperty = function (name) {
    switch (name) {
        case ZombieSkin.PROPERTY_CAN_MOVE:
            return this.zombieSprite.currentAnimation != "hit" && this.zombieSprite.currentAnimation != "hold" && this.zombieSprite.currentAnimation != "die";
            break;
    }

    return  goog.base(this, "getProperty", name);
};

/**
 * @param e {createjs.Event}
 */
ZombieSkin.prototype.animationEnd = function (e) {
    if (this.zombieSprite.currentAnimation == "die") {
        this.zombieSprite.stop();
        createjs.Tween.get(this.zombieSprite, {"useTicks": true, "loop": false})
            .to({"alpha": 0}, 100, createjs.Ease.none)
            .call(this.deadHandler);
    }
};

/**
 * Cleans up the component and removes it from parent if applicable
 */
ZombieSkin.prototype.destroy = function () {
    this.zombieSprite.removeEventListener("animationend", this.animationEndHandler);
    this.animationEndHandler = null;
    this.deadHandler = null;

    this.zombieSprite = null;

    goog.base(this, "destroy");
};

ZombieSkin.PROPERTY_CAN_MOVE = "canMove";

ZombieSkin.STATE_WALK = "walk";
ZombieSkin.STATE_ATTACK = "attack";
ZombieSkin.STATE_SHOT = "shot";
ZombieSkin.STATE_DEAD = "dead";