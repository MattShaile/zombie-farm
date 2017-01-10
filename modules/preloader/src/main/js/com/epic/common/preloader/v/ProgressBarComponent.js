goog.provide("com.epic.common.preloader.v.ProgressBarComponent");




/**
 * Displays a progress bar
 *
 * @constructor
 */
function ProgressBarComponent(skin) {
    this.skin = skin;
    this.skin.init();
}

/**
 * Updates the progress percentage
 * @param {number} percent
 */
ProgressBarComponent.prototype.updateProgress = function (percent) {
    this.skin.setProperty("value", percent);
};

/**
 * Destroys the skin contained within this component
 */
ProgressBarComponent.prototype.destroy = function () {
    this.skin.destroy();
};