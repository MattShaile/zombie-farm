goog.provide('com.epic.zfarm.navigation.v.skin.FarmButtonSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.util.QuickText');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function FarmButtonSkin(manifest, farmManifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Container}
     */
    this.waterPromptContainer = null;

    /**
     * @type {createjs.Sprite}
     */
    this.buttonSprite = null;

    /**
     * @type {createjs.Sprite}
     */
    this.waterPromptSprite = null;

    /**
     * @type {TextComponent}
     */
    this.waterPromptText = null;

    /**
     * @type {EaselManifest}
     */
    this.farmManifest = farmManifest;
}

goog.inherits(FarmButtonSkin, EaselSkin);

/**
 * Init the skin
 */
FarmButtonSkin.prototype.init = function () {
    this.buttonSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "farm");

    // Water prompt

    this.waterPromptContainer = new createjs.Container();
    this.waterPromptContainer.visible = false;

    this.waterPromptSprite = new createjs.Sprite(this.farmManifest.getSpriteSheet(), "hoedPlotPrompt");
    this.waterPromptSprite.x = 75;
    this.waterPromptSprite.y = 10;

    this.waterPromptText = QuickText.createText("x5", "30px Arial", "4px #000", "#fff", 100, 60);

    this.waterPromptContainer.addChild(this.waterPromptSprite);
    this.waterPromptText.addToContainer(this.waterPromptContainer);

    //

    this.container.addChild(this.buttonSprite);
    this.container.addChild(this.waterPromptContainer);

};

/**
 * Changes the state of the skin
 * @param {string} state
 */
FarmButtonSkin.prototype.changeState = function (state) {
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
FarmButtonSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case FarmButtonSkin.PROPERTY_NUM_DRY_CROPS:
            if (value == 0) {
                this.waterPromptContainer.visible = false;
            } else {
                this.waterPromptContainer.visible = true;
                this.waterPromptText.setProperty("text", "x" + value);
            }
            break;
    }
};

/**
 * @returns {createjs.Container}
 */
FarmButtonSkin.prototype.getEventDispatcher = function () {
    return this.container;
};


FarmButtonSkin.PROPERTY_NUM_DRY_CROPS = "numDryCrops";