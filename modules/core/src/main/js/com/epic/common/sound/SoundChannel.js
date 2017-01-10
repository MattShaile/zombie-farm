goog.provide('com.epic.common.sound.SoundChannel');

goog.require('com.epic.common.sound.SoundClip');
goog.require('com.epic.common.sound.SoundMixer');


/**
 * A Soundchannel is a collection of sounds and other sound channels, all sounds in the channel can be controlled via the channel interface or each sound can be accessed individually using getSound
 * @param id
 * @constructor
 */
function SoundChannel(id)
{
    this.id = id;
    this.channels = {};
    this.sounds = {};
    this.mixer = new SoundMixer(this);
}

/**
 * Adds a channel to this channel
 * @param channel
 */
SoundChannel.prototype.addChannel = function(channel)
{
    channel.channel = this;
    this.channels[channel.id] = channel;
}

/**
 * Returns a channel based on its ID
 * @param id
 * @returns {*}
 */
SoundChannel.prototype.getChannel = function(id)
{
    return this.channels[id];
}

/**
 * Adds a SoundClip to the Channel
 * @param id
 * @param sound
 */
SoundChannel.prototype.addSound = function(id, sound)
{
    sound.channel = this;
    this.sounds[id] = sound;
}

/**
 * Returns a sound based on its ID
 * @param id
 * @returns {*}
 */
SoundChannel.prototype.getSound = function(id)
{
    if(this.sounds[id])
    {
        return this.sounds[id];
    }

    for(var channel in this.channels)
    {
        var sound = this.channels[channel].getSound(id);
        if(sound)
        {
            return sound;
        }
    }
}

/**
 * Stops All sounds and channels from playing within this channel
 */
SoundChannel.prototype.stopAllSounds = function()
{

    for(var sound in this.sounds)
    {
        this.sounds[sound].stop();
    }

    for(var channel in this.channels)
    {
        this.channels[channel].stopAllSounds();
    }

}


/**
 * Stops All sounds and channels from playing within this channel
 */
SoundChannel.prototype.update = function()
{

    for(var channel in this.channels)
    {
        this.channels[channel].mixer.inputLevel = this.mixer.outputLevel;
        this.channels[channel].mixer.update();
        this.channels[channel].update();
    }

    for(var sound in this.sounds)
    {
        this.sounds[sound].mixer.inputLevel = this.mixer.outputLevel;
        this.sounds[sound].mixer.update();
        this.sounds[sound].update();
    }



}


