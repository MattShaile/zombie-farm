goog.provide('com.epic.common.util.Timer');

goog.require('com.epic.common.util.event.TimerEvent');
goog.require('com.epic.common.util.StageSetup');


/**
 * @constructor
 */
function Timer(ms, repeat) {
    createjs.EventDispatcher.initialize(Timer.prototype);

    /**
     * @type {Number}
     */
    this.frames = ms / StageSetup.fps;

    /**
     * @type {Number}
     */
    this.repeat = repeat;

    /**
     * @type {Number}
     */
    this.count = 0;

    /**
     * @type {Number}
     */
    this.lastCount = 0;

    // Closure scope functions
    var inst = this;

    this.onChangeHandler = function (e) {
        inst.onChange(e);
    }
}

Timer.prototype.start = function () {
    this.lastCount = this.count = 0;

    createjs.Tween.get(this, {"loop": false, "useTicks": true})
        .to({"count": this.repeat }, this.frames * this.repeat)
        .addEventListener("change", this.onChangeHandler);
};

Timer.prototype.stop = function () {
    createjs.Tween.removeTweens(this);
};

Timer.prototype.onChange = function (e) {
    if (this.lastCount != Math.floor(this.count)) {
        this.lastCount = Math.floor(this.count);

        this.dispatchEvent(new TimerEvent(TimerEvent.CHANGE, this, Math.floor(this.count), this.repeat));

        if (this.count == this.repeat) {
            createjs.Tween.removeTweens(this);
            this.dispatchEvent(new TimerEvent(TimerEvent.COMPLETE, this, Math.floor(this.count), this.repeat));
        }
    }
};