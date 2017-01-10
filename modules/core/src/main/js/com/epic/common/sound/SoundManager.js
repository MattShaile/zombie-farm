goog.provide('com.epic.common.sound.SoundManager');

goog.require('com.epic.common.sound.SoundChannel');


/**
 * A singleton class that controls the playing of sounds
 * @constructor
 */
function SoundManager() {
    this.source = null;
    this._files = {};
    this._soundDefinitions = {};
    this.root = new SoundChannel("root");
}

//Singleton code
SoundManager._instance = null;

/**
 * Returns a single static instance of the Sound Manager
 * @returns {*}
 */
SoundManager.getInstance = function () {
    if (this._instance) {
        return this._instance;
    }
    this._instance = new SoundManager("root");
    return this._instance;
}

/**
 * Registers a file with the Sound Manager
 * @param id
 * @param file
 */
SoundManager.prototype.addFile = function (id, file) {
    this._files[id] = file;

    //Sound.js bit
    createjs.Sound.registerSound(file, id);

}

/**
 * Finds a sound channel based on its ID
 * @param id
 * @returns {*}
 */
SoundManager.prototype.getChannel = function (id) {
    return this.root.getChannel(id);
}

/**
 * Finds a sound based on its ID
 * @param id
 * @returns {*}
 */
SoundManager.prototype.getSound = function (id) {
    return this.root.getSound(id);
}

/**
 * Stops All sounds from playing
 * @returns {*}
 */
SoundManager.prototype.stopAllSounds = function () {
    return this.root.stopAllSounds();
}
