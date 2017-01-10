goog.provide('com.epic.zfarm.inventory.v.component.IInventoryComponent');

goog.require('com.epic.zfarm.inventory.v.component.InventoryItemComponent');


/**
 * A component ready to accept ItemConfigVOs
 * @interface
 */
function IInventoryComponent(skin) {
};

/**
 * Adds an inventory button to the collection on start up
 * @param button {InventoryItemComponent}
 */
IInventoryComponent.prototype.addInventoryItem = function (button) {
};

/**
 * @param inventoryType {String}
 */
IInventoryComponent.prototype.init = function (inventoryType) {
};

/**
 * @param inventoryType {String}
 * @returns {Boolean}
 */
IInventoryComponent.prototype.inventoryIsType = function (inventoryType) {
};

/**
 * @returns {String}
 */
IInventoryComponent.prototype.getInventoryType = function() {
};