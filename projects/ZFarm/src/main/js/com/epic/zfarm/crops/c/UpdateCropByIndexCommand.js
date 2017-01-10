goog.provide('com.epic.zfarm.crops.c.UpdateCropByIndexCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.m.vo.CropVO');
goog.require('com.epic.zfarm.crops.m.vo.SoilConfigVO');
goog.require('com.epic.zfarm.crops.note.CropDryNoteBody');
goog.require('com.epic.zfarm.crops.note.CropNoteBody');
goog.require('com.epic.zfarm.crops.note.CropStateNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function UpdateCropByIndexCommand() {
}

goog.inherits(UpdateCropByIndexCommand, puremvc.SimpleCommand);

UpdateCropByIndexCommand.prototype.execute = function (note) {
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    var cropIndex = note.getBody().getId();

    /**
     * @type {CropVO}
     */
    var cropVO = cropProxy.getCropByIndex(cropIndex);

    this.facade.sendNotification(CropStateNoteBody.DO_UPDATE_STATE, new CropStateNoteBody(cropIndex, cropVO.soilState.label, cropVO.plant ? cropVO.plant.label : "", cropVO.growthLevel));

    if (cropVO.soilState == SoilConfigVO.HOED && cropVO.plant) {
        this.facade.sendNotification(CropNoteBody.DO_SHOW_CROP_DRY_PROMPT, new CropNoteBody(cropIndex));
    } else {
        this.facade.sendNotification(CropNoteBody.DO_HIDE_CROP_DRY_PROMPT, new CropNoteBody(cropIndex));
    }

    this.facade.sendNotification(CropDryNoteBody.DO_UPDATE_DRY_CROPS_COUNT, new CropDryNoteBody(cropProxy.getNumDryCrops()));
};