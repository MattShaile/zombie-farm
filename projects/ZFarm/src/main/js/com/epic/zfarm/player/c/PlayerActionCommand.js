goog.provide('com.epic.zfarm.player.c.PlayerActionCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.m.vo.ActionConfigVO');
goog.require('com.epic.zfarm.crops.note.CropActionNoteBody');
goog.require('com.epic.zfarm.inventory.m.InventoryProxy');
goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');
goog.require('com.epic.zfarm.navigation.m.NavigationConstants');
goog.require('com.epic.zfarm.navigation.m.NavigationProxy');
goog.require('com.epic.zfarm.player.m.PlayerProxy');
goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerActionCommand() {
}

goog.inherits(PlayerActionCommand, puremvc.SimpleCommand);

PlayerActionCommand.prototype.execute = function (note) {
    /**
     * @type {PlayerProxy}
     */
    var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);

    /**
     * @type {CropProxy}
     */
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    /**
     * @type {InventoryProxy}
     */
    var inventoryProxy = this.facade.retrieveProxy(InventoryProxy.NAME);

    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    /**
     * @type {NavigationProxy}
     */
    var navigationProxy = this.facade.retrieveProxy(NavigationProxy.NAME);

    /**
     * @type {ActionConfigVO}
     */
    var action = ActionConfigVO.getActionForCropVO(cropProxy.getSelectedCrop());

    if (action) {
        /**
         * @type {ItemConfigVO}
         */
        var requiredItem = action.getRequiredItem();
        /**
         * @type {ItemConfigVO}
         */
        var inventoryItem = inventoryProxy.getSelectedInventoryItem();

        this.facade.sendNotification(CropActionNoteBody.WHEN_CROP_ACTION, new CropActionNoteBody(action));
    }
    else {
        // If on zombie screen and there are zombies to shoot

        if (navigationProxy.getCurrentScreen() == NavigationConstants.FARM_SCREEN) {
            this.facade.sendNotification(PlayerNoteBody.DO_IDLE, new PlayerNoteBody());
        } else {
            playerProxy.setReadyToShoot(true);
        }
    }
};