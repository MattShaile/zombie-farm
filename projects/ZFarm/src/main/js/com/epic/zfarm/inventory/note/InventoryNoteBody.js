goog.provide('com.epic.zfarm.inventory.note.InventoryNoteBody');




/**
 * @constructor
 * @param id {Number}
 * @param inventoryType {String}
 */
function InventoryNoteBody(id, inventoryType) {
    this.id = id;
    this.inventoryType = inventoryType;
}

/**
 * @returns {Number}
 */
InventoryNoteBody.prototype.getId = function () {
    return this.id;
};

/**
 * @returns {String}
 */
InventoryNoteBody.prototype.getInventoryType = function () {
    return this.inventoryType;
};

/**
 * @type {string}
 */
InventoryNoteBody.WHEN_ITEM_CLICKED = "whenInventoryItemClicked";
/**
 * @type {string}
 */
InventoryNoteBody.DO_ITEM_SELECTED = "doInventoryItemSelected";
/**
 * @type {string}
 */
InventoryNoteBody.DO_INDICATE_CORRECT_ICON = "doIndicateCorrectInventoryIcon";