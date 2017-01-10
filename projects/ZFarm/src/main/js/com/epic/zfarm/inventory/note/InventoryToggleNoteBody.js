/**
 * Created by vikki_000 on 24/03/2014.
 */
goog.provide('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');




/**
 * @constructor
 * @param inventoryType {String}
 */
function InventoryToggleNoteBody(inventoryType) {
    /**
     * @type {String}
     */
    this.inventoryType = inventoryType;
}

InventoryToggleNoteBody.prototype.getInventoryType = function () {
    return this.inventoryType;
};

/**
 * @type {string}
 */
InventoryToggleNoteBody.DO_SHOW = "InventoryToggleNoteBody.DO_SHOW";
/**
 * @type {string}
 */
InventoryToggleNoteBody.DO_HIDE = "InventoryToggleNoteBody.DO_HIDE";