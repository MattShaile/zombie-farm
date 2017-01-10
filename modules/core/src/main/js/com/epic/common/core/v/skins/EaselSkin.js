goog.provide('com.epic.common.core.v.skins.EaselSkin');

goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.util.Utils');


/**
 * Creates an empty Container
 * @constructor
 * @implements {ISkin}
 */
function EaselSkin(manifest) {
    // Initialize createjs EventDispatcher class
    createjs.EventDispatcher.initialize(EaselSkin.prototype);

    /**
     * @type {*}
     */
    this.manifest = manifest;
    /**
     * @type {createjs.Container}
     */
    this.container = new createjs.Container();
}

/**
 * Initializes the skin creating it's container and any other assets it needs from the start
 */
EaselSkin.prototype.init = function () {
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
EaselSkin.prototype.changeState = function (state) {
    this.currentState = state;
};

/**
 * Sets a property within the skin
 * @param {string} name
 * @param {*} value
 */
EaselSkin.prototype.setProperty = function (name, value) {
    switch (name) {
        case "x":
            this.container.x = value;
            break;
        case "y":
            this.container.y = value;
            break;
        case "scale":
            this.container.scaleX = this.container.scaleY = value;
            break;
        case "visible":
            this.container.visible = value;
            break;
    }
};

/**
 * Gets a property within the skin (although you should be tracking any states outside of the skin itself, so only use when appropriate)
 * @param {string} name
 */
EaselSkin.prototype.getProperty = function (name) {
    switch (name) {
        case "x":
            return this.container.x;
            break;
        case "y":
            return this.container.y;
            break;
    }
};

/**
 * Gets the event dispatcher of the skin
 * @returns {*}
 */
EaselSkin.prototype.getEventDispatcher = function () {
    return this;
};

/**
 * Gets the container of the skin
 * @returns {createjs.Container}
 */
EaselSkin.prototype.getContainer = function () {
    return this.container;
};

/**
 * Gets the parent container of the skin
 * @returns {createjs.Container}
 */
EaselSkin.prototype.getParentContainer = function () {
    return this.parentContainer;
};

/**
 * Adds this skin's container to a specified parent
 * @param parentContainer
 * @param [index=-1] {Number}      Depth index to add to. -1 = top
 */
EaselSkin.prototype.addToContainer = function (parentContainer, index) {
    index = typeof index !== 'undefined' ? index : -1;

    this.removeFromContainer();
    this.parentContainer = parentContainer;

    if (index > -1 && index <= parentContainer.getNumChildren()) {
        parentContainer.addChildAt(this.container, index);
    } else {
        parentContainer.addChild(this.container);
    }
};

/**
 * Removes the skin from the parent container it was previously added to
 */
EaselSkin.prototype.removeFromContainer = function () {
    if (this.parentContainer) {
        this.parentContainer.removeChild(this.container);
        this.parentContainer = null;
    }
}

/**
 * Cleans up the component and removes it from parent if applicable
 */
EaselSkin.prototype.destroy = function () {
    this.removeFromContainer();

    Utils.clearObject(this);
};