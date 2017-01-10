goog.provide("com.epic.common.preloader.v.skins.PercentageTextSkin");

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * Displays a percentage text field
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function PercentageTextSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(PercentageTextSkin, EaselSkin);

/**
 * Initializes the skin creating it's container and any other assets it needs from the start
 */
PercentageTextSkin.prototype.init = function () {
    /**
     * @type {createjs.Text}
     */
    this.valueText = new createjs.Text("", "32px 'Denk One'", "#fff");
    this.valueText.x = 20;
    this.valueText.text = "LOADING";
    this.valueText.textAlign = "center";

    this.barMask = new createjs.Shape();
    this.barMask.graphics.beginFill("#f00").drawRoundRect(-184, 50, 406, 20, 42);

    this.loadBorder = new createjs.Shape();
    this.loadBorder.graphics.setStrokeStyle(2).beginLinearGradientStroke(["#ccc", "#999"], [0, 1], -185, 47, 223, -7).drawRoundRect(-185, 47, 408, 24, 40);

    this.loadBar = new createjs.Shape();
    this.loadBar.graphics.beginLinearGradientFill(["#ad4300", "#ff6600"], [0, 1], 0, 0, 408, 0).drawRect(0, 0, 415, 30);
    this.loadBar.x = -190;
    this.loadBar.y = 44;

    this.loadBar.mask = this.barMask;

    this.loadBar.scaleX = 0;

    this.container.addChild(this.valueText);
    this.container.addChild(this.loadBar);
    this.container.addChild(this.loadBorder);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
PercentageTextSkin.prototype.changeState = function (state) {
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
PercentageTextSkin.prototype.setProperty = function (name, value) {
    switch (name) {
        case "value":
            if (value >= 100) {
                this.valueText.text = "LOAD COMPLETE";

            }
            this.loadBar.scaleX = value;
            break;
    }
};
/**
 * Cleans up the component and removes it from parent if applicable
 */
PercentageTextSkin.prototype.destroy = function () {
    this.barMask = null;

    this.container.removeChild(this.valueText);
    this.container.removeChild(this.loadBar);
    this.container.removeChild(this.loadBorder);

    this.parentContainer.removeChild(this.container);

    this.valueText = null;
    this.loadBar = null;
    this.loadBorder = null;

    goog.base(this, "destroy");
};