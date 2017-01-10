/**
 * Created by Vikki on 18/03/14.
 */
goog.provide('com.epic.zfarm.inventory.c.SelectInventoryItemCommand');

goog.require('com.epic.zfarm.crops.c.DoCropActionCommand');
goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.m.vo.ActionConfigVO');
goog.require('com.epic.zfarm.crops.note.CropActionNoteBody');
goog.require('com.epic.zfarm.inventory.m.InventoryProxy');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');
goog.require('com.epic.zfarm.inventory.note.InventoryNoteBody');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function SelectInventoryItemCommand() {
}

goog.inherits(SelectInventoryItemCommand, puremvc.SimpleCommand);

SelectInventoryItemCommand.prototype.execute = function (note) {
    var inventoryProxy = this.facade.retrieveProxy(InventoryProxy.NAME);

    /**
     * @type {InventoryNoteBody}
     */
    var inventoryNoteBody = note.getBody();

    var inventoryIndex = inventoryNoteBody.getId();
    var inventoryType = inventoryNoteBody.getInventoryType();

    if(this.seedHasBeenSelected(inventoryType))
    {
        inventoryProxy.setSelectedSeedPacketItemBy(inventoryIndex, inventoryType);
        this.facade.sendNotification(InventoryToggleNoteBody.DO_HIDE, new InventoryToggleNoteBody(SeedPacketItemConfigVO.INVENTORY_TYPE));

        this.sendPlantSeedsAction();
    }
    else
    {
        inventoryProxy.setSelectedInventoryItemBy(inventoryIndex, inventoryType);
        this.facade.sendNotification(InventoryNoteBody.DO_ITEM_SELECTED, new InventoryNoteBody(inventoryIndex, inventoryType));
    }
};

/**
 * @returns {Boolean}
 */
SelectInventoryItemCommand.prototype.seedHasBeenSelected = function(inventoryType)
{
    return inventoryType == SeedPacketItemConfigVO.INVENTORY_TYPE;
};

/**
 * This triggers the when action which launches DoCropActionCommand.
 * DoCropActionCommand actually triggers the consequences of wanting to operate on a crop.
 */
SelectInventoryItemCommand.prototype.sendPlantSeedsAction = function() {

    /**
     * @type {CropProxy}
     */
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    /**
     * @type {ActionConfigVO}
     */
    var action = ActionConfigVO.PLANT_SELECT;

    if(action)
    {
        //player is ready to plant the now selected seeds
        this.facade.sendNotification(CropActionNoteBody.WHEN_CROP_ACTION, new CropActionNoteBody(action));
    }
};
