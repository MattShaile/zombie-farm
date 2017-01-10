goog.provide('com.epic.zfarm.crops.v.event.CropEvent');




/**
 * @constructor
 * @param {Number}
 */
function CropEvent(type, target, id) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;

    /**
     * @type {Number}
     */
    this.id = id;
};

/**
 * @returns {Number}
 */
CropEvent.prototype.getId = function () {
    return this.id;
};

/**
 * @type {string}
 */
CropEvent.EVENT_CROP_CLICKED = "eventCropClicked";