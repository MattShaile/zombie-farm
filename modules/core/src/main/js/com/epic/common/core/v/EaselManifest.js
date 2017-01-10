goog.provide('com.epic.common.core.v.EaselManifest');




/**
 * @constructor
 */
function EaselManifest() {
    // TODO: Refactor to m
}

/**
 * Sets the images object for use with the spritesheet data object
 * @param {Object} images
 */
EaselManifest.prototype.setImages = function (images) {
    this.images = images;
};

/**
 * Gets the sprite sheet data object
 * @returns {*}
 */
EaselManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = {};
    }
    return this.spriteSheetData;
};

/**
 * Gets the easel SpriteSheet object
 * @returns {*}
 */
EaselManifest.prototype.getSpriteSheet = function () {
    if (!this.spriteSheet) {
        var data = this.getSpriteSheetData();
        this.spriteSheet = new createjs.SpriteSheet(data);

        this.images = null;
    }

    return this.spriteSheet;
};

/**
 * Returns an object containing the width and height of the first or last frame of an animation
 * @param frame
 * @param [lastFrame=false]     If true gets the last frame instead of the first
 * @returns {{width: *, height: *}}
 */
EaselManifest.prototype.getBounds = function (frame, lastFrame) {
    lastFrame = (typeof lastFrame !== "undefined") ? lastFrame : false;

    var data = this.getSpriteSheetData();

    // Number of frames in the animation
    var numFrames = this.getSpriteSheet().getNumFrames(frame);

    if (data.animations[frame] && data.animations[frame].frames) {

        // Get the rectangle for the last frame in the animation
        var rectData = data.frames[data.animations[frame].frames[lastFrame ? numFrames - 1 : 0]];

        return {width: rectData[2], height: rectData[3]};
    } else {
        return null;
    }
};

/**
 * Gets a list of images to load and their id's
 * @returns {Array}
 */
EaselManifest.prototype.getImages = function () {
    return [];
};