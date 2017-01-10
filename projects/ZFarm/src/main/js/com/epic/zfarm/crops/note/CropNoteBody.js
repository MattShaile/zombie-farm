goog.provide('com.epic.zfarm.crops.note.CropNoteBody');




/**
 * @constructor
 * @param id {Number}
 */
function CropNoteBody(id) {
    this.id = id;
};

/**
 * @returns {Number}
 */
CropNoteBody.prototype.getId = function () {
    return this.id;
};

/**
 * @type {string}
 */
CropNoteBody.WHEN_CROP_CLICKED = "whenCropClicked";

/**
 * @type {string}
 */
CropNoteBody.WHEN_CROP_UPDATED = "whenCropUpdated";

/**
 * @type {string}
 */
CropNoteBody.DO_HIDE_CROP_DRY_PROMPT = "doHideCropDryPrompt";
CropNoteBody.DO_SHOW_CROP_DRY_PROMPT = "doShowCropDryPrompt";