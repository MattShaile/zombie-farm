goog.provide('com.epic.zfarm.inventory.v.skin.SeedPanelSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function SeedPanelSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(SeedPanelSkin, EaselSkin);

/**
 * Init the skin
 */
SeedPanelSkin.prototype.init = function (width, height) {
    var background = new createjs.Shape();
    background.graphics.beginFill("#AFEEEE").drawRect(0, 0, width, height);

    this.container.addChild(background);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
SeedPanelSkin.prototype.changeState = function (state) {
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
SeedPanelSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case SeedPanelSkin.PROPERTY_VISIBLE:
            this.container.visible = value;
            break;
    }
};

SeedPanelSkin.PROPERTY_VISIBLE = "SeedPanelSkin.PROPERTY_VISIBLE";