goog.provide('com.epic.zfarm.fence.v.skin.FenceSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function FenceSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(FenceSkin, EaselSkin);

/**
 * Init the skin
 */
FenceSkin.prototype.init = function () {
    /**
     * @type {createjs.Sprite}
     */
    this.fenceSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "basicFence");

    this.container.addChild(this.fenceSprite);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
FenceSkin.prototype.changeState = function (state) {
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
FenceSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case "property":
            break;
    }
};