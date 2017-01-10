goog.provide('com.epic.zfarm.inventory.c.HideInventoryCommand');

goog.require('com.epic.zfarm.inventory.m.vo.FarmItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ZombieItemConfigVO');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideInventoryCommand() {
}

goog.inherits(HideInventoryCommand, puremvc.SimpleCommand);

HideInventoryCommand.prototype.execute = function (note) {

    var inventoryType = ZombieItemConfigVO.INVENTORY_TYPE;
    if (note.getBody().getToggled())
    {
        inventoryType = FarmItemConfigVO.INVENTORY_TYPE;
    }

    this.facade.sendNotification(InventoryToggleNoteBody.DO_HIDE,  new InventoryToggleNoteBody(inventoryType));
    this.facade.sendNotification(InventoryToggleNoteBody.DO_HIDE,  new InventoryToggleNoteBody(SeedPacketItemConfigVO.INVENTORY_TYPE));

};