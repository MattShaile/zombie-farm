goog.provide('com.epic.zfarm.inventory.v.skin.InventorySkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function InventorySkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Shape}
     */
    this.highlightShape = null;
    /**
     * @type {createjs.Sprite}
     */
    this.arrowSprite = null;

    // Closure scope functions
    var inst = this;

    this.handleFadeComplete = function() {
        inst.fadeComplete();
    }

}

goog.inherits(InventorySkin, EaselSkin);

/**
 * Init the skin
 */
InventorySkin.prototype.init = function () {
    this.highlightShape = new createjs.Shape();
    this.highlightShape.graphics.setStrokeStyle(5).beginStroke("#f00").drawRect(-1, 0, 78, 78);

    this.container.addChild(this.highlightShape);

    this.arrowSprite = new createjs.Sprite(this.manifest.getSpriteSheet());
    this.arrowSprite.gotoAndStop("arrow");
    this.arrowSprite.visible = false;

    this.container.addChild(this.arrowSprite);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
InventorySkin.prototype.changeState = function (state) {
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
InventorySkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case InventorySkin.PROPERTY_HIGHLIGHT_X:
            createjs.Tween.get(this.highlightShape, {"override": true, "useTicks": true})
                .to({"x": value}, 20, createjs.Ease.backOut);
            break;
        case InventorySkin.PROPERTY_CORRECT_X:
            this.arrowSprite.x = value;
            this.arrowSprite.y = -100;
            this.arrowSprite.visible = true;

            createjs.Tween.get(this.arrowSprite, {"override": true, "useTicks": true})
                .to({"y": 0}, 20, createjs.Ease.bounceOut)
                .wait(5)
                .to({"visible": false}, 1, createjs.Ease.backOut)
                .wait(5)
                .to({"visible": true}, 1, createjs.Ease.backOut)
                .wait(5)
                .to({"visible": false}, 1, createjs.Ease.backOut)
                .wait(5)
                .to({"visible": true}, 1, createjs.Ease.backOut)
                .wait(5)
                .to({"visible": false}, 1, createjs.Ease.backOut)
                .wait(5)
                .to({"visible": true}, 1, createjs.Ease.backOut)
                .wait(40)
                .to({"visible": false}, 1, createjs.Ease.backOut);
            break;
        case InventorySkin.PROPERTY_VISIBLE:
            if(value)
            {
                this.fadeIn();
            }
            else
            {
                this.fadeOut();
            }
            break;
        default:
            goog.base(this, "setProperty", name, value);
            break;
    }
};

InventorySkin.prototype.fadeIn = function() {
    this.container.alpha = 0;
    this.container.visible = true;
    createjs.Tween.get(this.container, {"override": true, "useTicks": true})
        .to({"alpha": 1}, 20, createjs.Ease.backOut);
};

InventorySkin.prototype.fadeOut = function() {

    createjs.Tween.get(this.container, {"override": true, "useTicks": true})
        .to({"alpha": 0}, 20, createjs.Ease.backOut)
        .call(this.handleFadeComplete);
};

InventorySkin.prototype.fadeComplete = function ()
{
    this.container.alpha = 0;
    this.container.visible = false;
};

/**
 * Hides the correct indicator.
 */
InventorySkin.prototype.clearCorrectPosition = function () {
    this.arrowSprite.visible = false;
};

/**
 * @type {string}
 * @static
 */
InventorySkin.PROPERTY_HIGHLIGHT_X = "highlightX";
/**
 * @type {string}
 * @static
 */
InventorySkin.PROPERTY_CORRECT_X = "correctX";

/**
 * @type {string}
 * @static
 */
InventorySkin.PROPERTY_VISIBLE = "visible";
