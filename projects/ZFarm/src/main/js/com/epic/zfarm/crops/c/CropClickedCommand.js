goog.provide('com.epic.zfarm.crops.c.CropClickedCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.player.note.PlayerMoveNoteBody');
goog.require('com.epic.zfarm.timer.note.TimerPositionNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function CropClickedCommand() {
}

goog.inherits(CropClickedCommand, puremvc.SimpleCommand);

CropClickedCommand.prototype.execute = function (note) {
    var cropId = note.getBody().getId();

    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    cropProxy.setSelectedCropIndex(cropId);

    var cropVO = cropProxy.getCropByIndex(cropId);

    this.facade.sendNotification(PlayerMoveNoteBody.DO_PLAYER_MOVE, new PlayerMoveNoteBody(cropVO.position));
    this.facade.sendNotification(TimerPositionNoteBody.DO_SET_X, new TimerPositionNoteBody(cropVO.position));
};