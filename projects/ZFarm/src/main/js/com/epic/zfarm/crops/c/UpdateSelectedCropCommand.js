goog.provide('com.epic.zfarm.crops.c.UpdateSelectedCropCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.note.CropNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function UpdateSelectedCropCommand() {
}

goog.inherits(UpdateSelectedCropCommand, puremvc.SimpleCommand);

UpdateSelectedCropCommand.prototype.execute = function (note) {
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    var selectedCropIndex = cropProxy.getSelectedCropIndex();

    this.facade.sendNotification(CropNoteBody.WHEN_CROP_UPDATED, new CropNoteBody(selectedCropIndex));
};