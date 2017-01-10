goog.provide('com.epic.common.core.m.SoundManifest');




/**
 * @constructor
 */
function SoundManifest() {
}

/**
 * Sets the xml object
 * @param {Object} xml
 */
SoundManifest.prototype.setSounds = function (sounds) {
    this.sounds = sounds;

    for (var sound in this.sounds) {
        createjs.Sound.registerSound(this.sounds[sound].src, sound);
    }
};

/**
 * Gets a list of xml files to load and their id's
 * @returns {Array}
 */
SoundManifest.prototype.getSounds = function () {
    return [];
};