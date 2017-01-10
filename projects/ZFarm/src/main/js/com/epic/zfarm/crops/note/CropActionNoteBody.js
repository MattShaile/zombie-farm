goog.provide('com.epic.zfarm.crops.note.CropActionNoteBody');

goog.require('com.epic.zfarm.crops.m.vo.ActionConfigVO');


/**
 * @constructor
 * @param action {ActionConfigVO}
 */
function CropActionNoteBody(action) {
    this.action = action;
};

/**
 * @returns {Number}
 */
CropActionNoteBody.prototype.getAction = function () {
    return this.action;
};
/**
 * @type {string}
 */
CropActionNoteBody.WHEN_CROP_ACTION = "CropActionNoteBody.WHEN_CROP_ACTION";