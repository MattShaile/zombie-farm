goog.provide('com.epic.zfarm.inventory.c.ShowInventoryCommand');

goog.require('com.epic.zfarm.inventory.m.vo.FarmItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ZombieItemConfigVO');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowInventoryCommand() {
}

goog.inherits(ShowInventoryCommand, puremvc.SimpleCommand);

ShowInventoryCommand.prototype.execute = function (note) {

    var inventoryType = FarmItemConfigVO.INVENTORY_TYPE;
    if (note.getBody().getToggled())
    {
        inventoryType = ZombieItemConfigVO.INVENTORY_TYPE;
    }

    this.facade.sendNotification(InventoryToggleNoteBody.DO_SHOW,  new InventoryToggleNoteBody(inventoryType));

};