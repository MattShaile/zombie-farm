goog.provide('com.epic.zfarm.scenery.v.skin.ScenerySkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function ScenerySkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(ScenerySkin, EaselSkin);

/**
 * Init the skin
 */
ScenerySkin.prototype.init = function () {
    /**
     * @type {createjs.Sprite}
     */
    this.backgroundSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "background");

    /**
     * @type {createjs.Shape}
     */
    this.dayShape = new createjs.Shape();
    this.dayShape.graphics.beginFill("#0099ff").drawRect(0, 0, 1920, 540);

    /**
     * @type {createjs.Shape}
     */
    this.nightShape = new createjs.Shape();
    this.nightShape.graphics.beginFill("#330033").drawRect(0, 0, 1920, 540);

    this.container.addChild(this.nightShape);
    this.container.addChild(this.dayShape);
    this.container.addChild(this.backgroundSprite);

    createjs.Tween.get(this.dayShape, {"useTicks": true, "loop": true})
        .to({"alpha": 0}, 3000, createjs.Ease.none)
        .to({"alpha": 1}, 3000, createjs.Ease.none);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
ScenerySkin.prototype.changeState = function (state) {
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
ScenerySkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case "property":
            break;
    }
};