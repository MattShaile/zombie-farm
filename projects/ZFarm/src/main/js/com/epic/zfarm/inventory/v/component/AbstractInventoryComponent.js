goog.provide('com.epic.zfarm.inventory.v.component.AbstractInventoryComponent');

goog.require('com.epic.zfarm.inventory.v.component.IInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryItemComponent');
goog.require('com.epic.zfarm.inventory.v.event.InventoryEvent');
goog.require('com.epic.zfarm.inventory.v.skin.InventorySkin');
goog.require('com.epic.common.core.v.skins.EaselSkin');


/**
 * @constructor
 * @param skin {EaselSkin}
 * @implements {IInventoryComponent}
 */
function AbstractInventoryComponent(skin) {
    createjs.EventDispatcher.initialize(AbstractInventoryComponent.prototype);

    /**
     * @type {InventorySkin}
     */
    this.skin = skin;

    /**
     * @type {Array}
     */
    this.inventoryButtons = [];

    /**
     * @type {String}
     */
    this.inventoryType = null;
};

/**
 * @param inventoryType {String}
 */
AbstractInventoryComponent.prototype.init = function (inventoryType) {
    this.inventoryType = inventoryType;
};


AbstractInventoryComponent.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "click":
            var highlightedItemID = event.target.getID();
            this.dispatchEvent(new InventoryEvent(InventoryEvent.EVENT_ITEM_CLICKED, this, highlightedItemID));
            break;
    }
};

/**
 * @returns {String}
 */
AbstractInventoryComponent.prototype.getInventoryType = function() {
    return this.inventoryType;
};


/**
 * @param inventoryType {String}
 * @returns {Boolean}
 */
AbstractInventoryComponent.prototype.inventoryIsType = function (inventoryType) {
    return this.inventoryType === inventoryType;
};

/**
 * @param itemID {Number}
 * @returns {InventoryItemComponent}
 */
AbstractInventoryComponent.prototype.getItemByID = function(itemID) {

    for( var i = 0; i < this.inventoryButtons.length; i++)
    {
        if(this.inventoryButtons[i].getID() == itemID)
        {
            return this.inventoryButtons[i];
        }
    }

    return null;
};

AbstractInventoryComponent.prototype.hide = function() {
    this.toggleVisibility(false);
};

AbstractInventoryComponent.prototype.show = function() {
    this.toggleVisibility(true);
};

AbstractInventoryComponent.prototype.toggleVisibility = function(value) {
    this.skin.setProperty(InventorySkin.PROPERTY_VISIBLE, value);

    for(var i = 0; i < this.inventoryButtons.length; i++)
    {
        this.inventoryButtons[i].setVisible(value);
    }
};