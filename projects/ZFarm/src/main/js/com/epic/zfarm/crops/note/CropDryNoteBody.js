goog.provide('com.epic.zfarm.crops.note.CropDryNoteBody');




/**
 * @constructor
 * @param numDryCrops {Number}
 */
function CropDryNoteBody(numDryCrops) {
    this.numDryCrops = numDryCrops;
};

/**
 * @returns {Number}
 */
CropDryNoteBody.prototype.getNumDryCrops = function () {
    return this.numDryCrops;
};

/**
 * @type {string}
 */
CropDryNoteBody.DO_UPDATE_DRY_CROPS_COUNT = "doUpdateDryCropsCount";