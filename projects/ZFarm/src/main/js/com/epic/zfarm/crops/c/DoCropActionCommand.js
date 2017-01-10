goog.provide('com.epic.zfarm.crops.c.DoCropActionCommand');

goog.require('com.epic.zfarm.crops.m.vo.ActionConfigVO');
goog.require('com.epic.zfarm.crops.note.CropActionNoteBody');
goog.require('com.epic.zfarm.inventory.m.InventoryProxy');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');
goog.require('com.epic.zfarm.player.note.PlayerActionNoteBody');
goog.require('com.epic.zfarm.timer.m.TimerProxy');
goog.require('com.epic.zfarm.timer.note.TimerNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function DoCropActionCommand() {
}

goog.inherits(DoCropActionCommand, puremvc.SimpleCommand);

/**
 *
 * @param note {CropActionNoteBody}
 */
DoCropActionCommand.prototype.execute = function (note) {
    /**
     * @type {InventoryProxy}
     */
    var inventoryProxy = this.facade.retrieveProxy(InventoryProxy.NAME);

    /**
     * @type {ActionConfigVO}
     */
    var action = note.getBody().getAction();

    if (this.plantingWithoutSeedSelected(action)) {
        this.facade.sendNotification(InventoryToggleNoteBody.DO_SHOW, new InventoryToggleNoteBody(SeedPacketItemConfigVO.INVENTORY_TYPE));
    }
    else {
        this.actOnCrop(action);
    }
};

/**
 *
 * @param action {ActionConfigVO}
 * @param seedItem {SeedPacketItemConfigVO}
 * @returns {boolean}
 */
DoCropActionCommand.prototype.plantingWithoutSeedSelected = function (action) {
    return action == ActionConfigVO.PLANT;
};

DoCropActionCommand.prototype.actOnCrop = function (action) {
    /**
     * @type {TimerProxy}
     */
    var timerProxy = this.facade.retrieveProxy(TimerProxy.NAME);

    timerProxy.startTimer(action.time);
    this.facade.sendNotification(TimerNoteBody.DO_SHOW, new TimerNoteBody(0));
    this.facade.sendNotification(PlayerActionNoteBody.DO_ACTION, new PlayerActionNoteBody(action.getAnimationName()));
};