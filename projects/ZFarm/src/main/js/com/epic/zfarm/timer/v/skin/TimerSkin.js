goog.provide('com.epic.zfarm.timer.v.skin.TimerSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function TimerSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.timerSprite = null;
}

goog.inherits(TimerSkin, EaselSkin);

/**
 * Init the skin
 */
TimerSkin.prototype.init = function () {
    this.timerSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "timer");

    this.container.addChild(this.timerSprite);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
TimerSkin.prototype.changeState = function (state) {
    goog.base(this, "changeState", state);

    switch (state) {
        case "state":
            break;
    }
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
TimerSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case TimerSkin.PROPERTY_PERCENT:
            this.timerSprite.gotoAndStop(value + 1);
            break;
        case TimerSkin.PROPERTY_VISIBLE:
            this.timerSprite.visible = value;
            break;
    }
};

TimerSkin.PROPERTY_PERCENT = "percent";
TimerSkin.PROPERTY_VISIBLE = "visible";