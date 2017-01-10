goog.provide('com.epic.zfarm.menu.v.skin.MenuButtonSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.util.QuickText');


// TODO: Use as generic button skin?

/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function MenuButtonSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(MenuButtonSkin, EaselSkin);

/**
 * Init the skin
 */
MenuButtonSkin.prototype.init = function () {
    this.buttonSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "menuButton");

    this.labelText = QuickText.createText("", "60px Arial", "3px #000", "#fff");

    this.container.addChild(this.buttonSprite);
    this.labelText.addToContainer(this.container);

};

/**
 * Changes the state of the skin
 * @param {string} state
 */
MenuButtonSkin.prototype.changeState = function (state) {
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
MenuButtonSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case "label":
            this.labelText.setProperty("text", value);
            break;
    }
};

/**
 * @returns {createjs.Container}
 */
MenuButtonSkin.prototype.getEventDispatcher = function () {
    return this.container;
};