goog.provide('com.epic.zfarm.inventory.v.skin.InventoryItemSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function InventoryItemSkin(manifest) {
    goog.base(this, manifest);

    /**
     * @type {createjs.Sprite}
     */
    this.itemSkin = null;

    // Closure scope functions
    var inst = this;

    this.handleFadeComplete = function() {
        inst.fadeComplete();
    }
}

goog.inherits(InventoryItemSkin, EaselSkin);

/**
 * Init the skin
 */
InventoryItemSkin.prototype.init = function (label) {
    this.itemSkin = new createjs.Sprite(this.manifest.getSpriteSheet());
    this.itemSkin.gotoAndStop(label);

    this.container.addChild(this.itemSkin);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
InventoryItemSkin.prototype.changeState = function (state) {
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
InventoryItemSkin.prototype.setProperty = function (name, value) {
    goog.base(this, "setProperty", name, value);

    switch (name) {
        case InventoryItemSkin.PROPERTY_VISIBLE:
            if(value)
            {
                this.fadeIn();
            }
            else
            {
                this.fadeOut();
            }
            break;
    }
};

InventoryItemSkin.prototype.fadeIn = function() {
    this.container.alpha = 0;
    this.container.visible = true;
    createjs.Tween.get(this.container, {"override": true, "useTicks": true})
        .to({"alpha": 1}, 20, createjs.Ease.backOut);
};

InventoryItemSkin.prototype.fadeOut = function() {

    createjs.Tween.get(this.container, {"override": true, "useTicks": true})
        .to({"alpha": 0}, 20, createjs.Ease.backOut)
        .call(this.handleFadeComplete);
};

InventoryItemSkin.prototype.fadeComplete = function ()
{
    this.container.alpha = 0;
    this.container.visible = false;
};

/**
 * @returns {createjs.Container}
 */
InventoryItemSkin.prototype.getEventDispatcher = function () {
    return this.container;
};

InventoryItemSkin.PROPERTY_VISIBLE = "InventoryItemSkin.PROPERTY_VISIBLE";