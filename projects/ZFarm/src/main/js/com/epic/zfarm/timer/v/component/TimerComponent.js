goog.provide('com.epic.zfarm.timer.v.component.TimerComponent');

goog.require('com.epic.zfarm.timer.v.skin.TimerSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * @constructor
 */
function TimerComponent(skin) {
    createjs.EventDispatcher.initialize(TimerComponent.prototype);

    /**
     * @type {ISkin}
     */
    this.skin = skin;
};

TimerComponent.prototype.setPercent = function (percent) {
    this.skin.setProperty(TimerSkin.PROPERTY_PERCENT, percent);
};

TimerComponent.prototype.setVisible = function (visible) {
    this.skin.setProperty(TimerSkin.PROPERTY_VISIBLE, visible);
};

TimerComponent.prototype.setX = function (x) {
    this.skin.setProperty("x", x);
};