goog.provide('com.epic.common.ui.slider.v.skins.BaseSliderSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * Base slider skin
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function BaseSliderSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(BaseSliderSkin, EaselSkin);

/**
 * Return the percent (between 0 and 1) of how far the handler has moved along the slider
 * @param event
 * @returns {number}
 */
BaseSliderSkin.prototype.getPercent = function (event) {
    return 0;
};

/**
 * Dispatch "clicked" event
 * @param event
 */
BaseSliderSkin.prototype.clicked = function (event) {
    this.dispatchEvent({type: "clicked", percent: this.getPercent(event)});
};

/**
 * Dispatch "startdrag" event
 * @param event
 */
BaseSliderSkin.prototype.startDrag = function (event) {
    this.dispatchEvent({type: "startdrag", percent: this.getPercent(event)});
};

/**
 * Dispatch drag event
 * @param event
 */
BaseSliderSkin.prototype.drag = function (event) {
    this.dispatchEvent({type: "drag", percent: this.getPercent(event)});
};
