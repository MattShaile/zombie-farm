goog.provide('com.epic.zfarm.crops.note.CropStateNoteBody');




/**
 * @type {Number}
 */
CropStateNoteBody.prototype.id = null;

/**
 * @type {String}
 */
CropStateNoteBody.prototype.soilFrame = null;

/**
 * @type {String}
 */
CropStateNoteBody.prototype.cropName = null;

/**
 * @type {Number}
 */
CropStateNoteBody.prototype.cropStage = null;

/**
 * @constructor
 * @param id            {Number}
 * @param soilFrame     {String}
 * @param cropName      {String}
 * @param cropStage     {Number}
 */
function CropStateNoteBody(id, soilFrame, cropName, cropStage) {
    this.id = id;
    this.soilFrame = soilFrame;
    this.cropName = cropName;
    this.cropStage = cropStage;
};

/**
 * @type {string}
 */
CropStateNoteBody.DO_UPDATE_STATE = "doCropUpdateState";