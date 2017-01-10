goog.provide('com.epic.zfarm.crops.v.skin.CropSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function CropSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.plotSprite = null;

    /**
     * @type {createjs.Sprite}
     */
    this.cropSprite = null;

    /**
     * @type {createjs.Sprite}
     */
    this.promptSprite = null;
}

goog.inherits(CropSkin, EaselSkin);

/**
 * Init the skin
 */
CropSkin.prototype.init = function () {
    this.plotSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "messyPlot");

    this.cropSprite = new createjs.Sprite(this.manifest.getSpriteSheet(), "tomato4");

    this.promptSprite = new createjs.Sprite(this.manifest.getSpriteSheet());
    this.promptSprite.gotoAndStop("messyPlotPrompt");

    this.container.addChild(this.plotSprite);
    this.container.addChild(this.cropSprite);
    this.container.addChild(this.promptSprite);

    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#f00").drawRect(-75, -140, 145, 200).endFill();

    this.container.hitArea = hitArea;

    this.changeState(CropSkin.STATE_EMPTY);

    var inst = this;
    this.animationEndHandler = function (e) {
        inst.animationEnd(e);
    };

    this.plotSprite.addEventListener("animationend", this.animationEndHandler);
    this.cropSprite.addEventListener("animationend", this.animationEndHandler);
    this.promptSprite.addEventListener("animationend", this.animationEndHandler);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
CropSkin.prototype.changeState = function (state) {
    goog.base(this, "changeState", state);

    switch (state) {
        case CropSkin.STATE_EMPTY:
            this.cropSprite.visible = false;
            break;
        case CropSkin.STATE_PLANTED:
            this.cropSprite.visible = true;
            break;
    }
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
CropSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case CropSkin.PROPERTY_SOIL_FRAME:
            this.promptSprite.gotoAndStop(value + "Prompt");
            this.plotSprite.gotoAndPlay(value);
            break;
        case CropSkin.PROPERTY_CROP_FRAME:
            if (this.cropSprite.currentAnimation != value) {
                this.cropSprite.gotoAndPlay(value);
            }
            break;
        case CropSkin.PROPERTY_IS_DRY:
            if (value) {
                this.promptSprite.gotoAndStop("hoedPlotPrompt");
            } else {
                this.promptSprite.gotoAndStop("waterEmpty");
            }
            break;
    }
};

/**
 * Gets the event dispatcher of the skin
 * @returns {*}
 */
CropSkin.prototype.getEventDispatcher = function () {
    return this.container;
};

/**
 * On animation ends just stop, don't loop
 * @param e {createjs.Event}
 */
CropSkin.prototype.animationEnd = function (e) {
    e.target.stop();
};

CropSkin.PROPERTY_SOIL_FRAME = "soilFrame";
CropSkin.PROPERTY_CROP_FRAME = "cropFrame";
CropSkin.PROPERTY_IS_DRY = "isDry";

CropSkin.STATE_EMPTY = "empty";
CropSkin.STATE_PLANTED = "planted";