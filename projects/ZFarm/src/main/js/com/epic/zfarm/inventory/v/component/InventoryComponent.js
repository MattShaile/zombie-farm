goog.provide('com.epic.zfarm.inventory.v.component.InventoryComponent');

goog.require('com.epic.zfarm.inventory.v.component.AbstractInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.IInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryItemComponent');
goog.require('com.epic.zfarm.inventory.v.skin.InventorySkin');


/**
 * @constructor
 * @param skin {InventorySkin}
 * @implements {IInventoryComponent}
 */
function InventoryComponent(skin) {
    createjs.EventDispatcher.initialize(InventoryComponent.prototype);

    goog.base(this, skin);
}

goog.inherits(InventoryComponent, AbstractInventoryComponent);

/**
 * Adds an inventory button to the collection on start up
 * @param button {InventoryItemComponent}
 */
InventoryComponent.prototype.addInventoryItem = function (button) {
    button.addEventListener("click", this);
    button.skin.setProperty("x",  this.skin.getProperty("x") + (100 * button.getID() - 1));
    button.skin.setProperty("y", this.skin.getProperty("y"));

    this.inventoryButtons.push(button);
};

/**
 * @param itemID {Number}
 * @param inventoryType {String}
 */
InventoryComponent.prototype.setSelectedItem = function(itemID){

    var highlightedItem = this.getItemByID(itemID);
    var xPosition = highlightedItem.getX() - this.skin.getProperty("x");
    this.skin.setProperty(InventorySkin.PROPERTY_HIGHLIGHT_X, xPosition);

    this.skin.clearCorrectPosition(); //todo do it here for now
};

/**
 * @param itemID {Number}
 * @param inventoryType {String}
 */
InventoryComponent.prototype.setCorrectItem = function(itemID){

    var correctItem = this.getItemByID(itemID);
    var xPosition = correctItem.getX() - this.skin.getProperty("x");
    this.skin.setProperty(InventorySkin.PROPERTY_CORRECT_X, xPosition);
};
