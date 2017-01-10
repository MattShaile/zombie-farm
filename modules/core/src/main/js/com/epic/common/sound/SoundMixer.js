goog.provide('com.epic.common.sound.SoundMixer');




/**
 Handles the volume and panning of any sound or sound channel
 */
function SoundMixer(sound)
{
    /**
     * Sound can be a Sound Clip or a Sound Channel
     * @type {*}
     */
    this.sound = sound;
    this.volume = 1;
    this.panning = 0;
    this.inputLevel = 1;
    this.outputLevel = 1;
}

/**
 * Fades a sounds volume to a specified level over a specified period of time
 * @param value
 * @param time
 * @returns {*}
 */
SoundMixer.prototype.volumeFadeTo = function(value, time)
{
    //Create this function when we need it.
    return this.sound;
}

/**
 * Sets the volume of this sound between 0 and 1
 */
SoundMixer.prototype.setVolume = function(value)
{
    this.volume = value;
    this.update();
    this.sound.update();
}

SoundMixer.prototype.update = function()
{
    this.outputLevel = this.inputLevel * this.volume;
}