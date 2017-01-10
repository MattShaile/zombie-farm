/**
 * Created by Vikki on 18/03/14.
 */
goog.provide('com.epic.zfarm.inventory.v.component.InventoryItemComponent');

goog.require('com.epic.zfarm.inventory.v.skin.InventoryItemSkin');
goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.ui.button.v.ButtonComponent');


/**
 * @param skin {ISkin}
 * @param [pulseSkin=null] {ISkin}
 * @constructor
 */
function InventoryItemComponent(skin, pulseSkin) {
    goog.base(this, skin, pulseSkin);

    /**
     * @type {Number}
     */
    this.id = null;
}

goog.inherits(InventoryItemComponent, ButtonComponent);

/**
 * @param id {Number}
 */
InventoryItemComponent.prototype.setID = function(id) {
    this.id = id;
};

/**
 * @returns {Number}
 */
InventoryItemComponent.prototype.getID = function() {
    return this.id;
};

/**
 * @returns {Number}
 */
InventoryItemComponent.prototype.getX = function() {
    return this.skin.getProperty("x");
};

/**
 * @param visible {Boolean}
 */
InventoryItemComponent.prototype.setVisible = function(visible) {
    this.skin.setProperty(InventoryItemSkin.PROPERTY_VISIBLE, visible);
};

