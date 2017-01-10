goog.provide('com.epic.common.core.v.skins.ISkin');




/**
 * A skin
 * @interface
 */
function ISkin(manifest) {
}

/**
 * Initializes the skin creating it's container and any other assets it needs from the start
 */
ISkin.prototype.init = function () {
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
ISkin.prototype.changeState = function (state) {
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
ISkin.prototype.setProperty = function (name, value) {
};

/**
 * Gets the event dispatcher of the skin
 * @returns {*}
 */
ISkin.prototype.getEventDispatcher = function () {
};

/**
 * Gets the container of the skin
 * @returns {*}
 */
ISkin.prototype.getContainer = function () {
};

/**
 * Adds this skin's container to a specified parent
 * @param {*} parentContainer
 */
ISkin.prototype.addToContainer = function (parentContainer) {
};

/**
 * Removes the skin from the parent container it was previously added to
 */
ISkin.prototype.removeFromContainer = function () {
}

/**
 * Cleans up the component and removes it from parent if applicable
 */
ISkin.prototype.destroy = function () {
};