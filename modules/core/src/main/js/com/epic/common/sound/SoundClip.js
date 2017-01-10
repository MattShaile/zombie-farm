goog.provide('com.epic.common.sound.SoundClip');

goog.require('com.epic.common.sound.SoundMixer');


/**
 * A SoundClip is a segment of a sound file that can be treated as an individual sound
 * @param id
 * @param fileID
 * @param start
 * @param end
 * @param loopStart
 * @param loopEnd
 * @constructor
 */
function SoundClip(id, fileID, start, end, loopStart, loopEnd) {
    this.channel = null;
    this.soundInstance = null;
    this.id = id;
    this.fileID = fileID;
    this.start = start;
    this.end = end;
    this.loopStart = loopStart ? loopStart : -1;
    this.loopEnd = loopEnd ? loopEnd : -1;
    this.intervalID = -1;
    this.mixer = new SoundMixer(this);
    this.repeatCount = 0;
    this.duration = 0;
    this.loop = 1;
    this.durationA = -1;
    this.durationB = -1;
    this.durationC = -1;
    this.mloop = false;
}


/**
 * Plays the sound clip
 * @param [loop=1] {Number}    Number of times the sound should loop
 */
SoundClip.prototype.play = function (loop, delay) {
    var inst = this;

    if (delay && delay > 0) {
        this.delayTimeout = setTimeout(function () {
            inst.play(loop);
        }, delay);
        return;
    }

    this.loop = loop ? loop : 1;
    //Destroy any pre-existing instance
    if (this.soundInstance) {
        this.soundInstance.stop();
    }
    this.repeatCount = 0;
    this.soundInstance = createjs.Sound.createInstance(this.fileID);
    this.soundInstance.setPosition(this.start);
    this.soundInstance.addEventListener("complete", this.onComplete);
    this.soundInstance.play(createjs.Sound.INTERRUPT_ANY);
    this.soundInstance.setVolume(this.mixer.outputLevel);
    //If no end defined then use full length
    if (this.end == -1) {
        this.end = this.soundInstance.getDuration();
    }
    this.duration = this.end - this.start;

    this.mloop = false;

    //If looping middle section
    if (this.loopStart != -1 && this.loopEnd != -1) {
        console.log("WE ARE MLOOPING");
        this.mloop = true;
        this.durationA = this.loopStart - this.start;
        this.durationB = this.loopEnd - this.loopStart;
        this.durationC = this.end - this.loopEnd;
    }

    var inst = this;
    clearTimeout(this.intervalID);
    //Set first timeout depending on whether regular playing or using mloop (middle looping)
    var timeoutDuration = this.mloop ? this.durationA + this.durationB : this.duration;
    console.log("PLAY FIRST UNTIL " + timeoutDuration);
    this.intervalID = setTimeout(function () {
        inst.repeatCheck()
    }, timeoutDuration);
}

SoundClip.prototype.isPlaying = function () {
    return (this.soundInstance != null);
}

/**
 * Stub function that is called when the sound has finished
 */
SoundClip.prototype.onComplete = function () {
    this.stop();
}

/**
 * Internal function to keep track of looping
 */
SoundClip.prototype.repeatCheck = function () {

    this.repeatCount++;
    if (this.repeatCount == this.loop) {

        this.stop();
        this.onComplete();
    }
    else {
        this.soundInstance.setVolume(0);
        this.soundInstance.setPosition(this.start);
        this.soundInstance = createjs.Sound.createInstance(this.fileID);
        var loopStartPosition = this.mloop ? this.loopStart : this.start;
        console.log("NOW LOOP BACK TO " + loopStartPosition);
        this.soundInstance.setPosition(loopStartPosition);
        this.soundInstance.addEventListener("complete", this.onComplete);
        this.soundInstance.play(createjs.Sound.INTERRUPT_ANY);
        this.soundInstance.setVolume(this.mixer.outputLevel);

        var inst = this;
        clearTimeout(this.intervalID);
        var timeoutDuration = this.mloop ? this.durationB : this.duration;
        console.log("PLAY FOR " + timeoutDuration);
        this.intervalID = setTimeout(function () {
            inst.repeatCheck()
        }, timeoutDuration);
    }
}

/**
 * Stops the sound clip from playing
 */
SoundClip.prototype.stop = function () {
    clearTimeout(this.intervalID);
    clearTimeout(this.delayTimeout);

    if (this.soundInstance) {
        this.soundInstance.stop();
        this.soundInstance.removeAllEventListeners();
        this.soundInstance = null;
    }
    else {
        console.log("STOP!!! NO INSTANCE!!! " + this.id);
    }
}

/**
 * Updates the sound levels from the Sound Mixers levels
 */
SoundClip.prototype.update = function () {
    if (this.soundInstance) {
        var newLevel = this.channel.mixer.outputLevel * this.mixer.volume;
        console.log("NEW LEVEL " + newLevel);
        this.soundInstance.setVolume(newLevel);
    }
}