goog.provide('com.epic.zfarm.navigation.v.skin.GrannyButtonSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function GrannyButtonSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.buttonSprite = null;
}

goog.inherits(GrannyButtonSkin, EaselSkin);

/**
 * Init the skin
 */
GrannyButtonSkin.prototype.init = function () {
    this.buttonSprite = new createjs.Sprite(this.manifest.getSpriteSheet());

    this.buttonSprite.gotoAndStop("granny");

    this.container.addChild(this.buttonSprite);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
GrannyButtonSkin.prototype.changeState = function (state) {
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
GrannyButtonSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case "property":
            break;
    }
};

/**
 * @returns {createjs.Container}
 */
GrannyButtonSkin.prototype.getEventDispatcher = function() {
    return this.container;
};