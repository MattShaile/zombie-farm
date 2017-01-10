goog.provide('com.epic.common.ui.button.v.ButtonComponent');

goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.util.Utils');


/**
 * Simple Button Component
 * @param skin {ISkin}
 * @param [pulseSkin=null] {ISkin}      Optional pulse skin to play a pulse animation when the button is pressed
 * @constructor
 */
function ButtonComponent(skin, pulseSkin) {
    /**
     * @type {ISkin}
     */
    this.skin = skin;

    /**
     * @type {ISkin}
     */
    this.pulseSkin = pulseSkin;

    /**
     * @type {boolean}
     */
    this.enabled = true;

    /**
     * If the button is disabled state still needs to be tracked so it can enable up or over correctly
     * @type {string}
     */
    this.stateWhenEnabled = ButtonComponent.STATE_UP;

    // Initialize createjs EventDispatcher class
    createjs.EventDispatcher.initialize(ButtonComponent.prototype);

    var inst = this;

    this.clickHandler = function (event) {
        inst.clicked(event);
    };
    this.skin.getEventDispatcher().addEventListener("click", this.clickHandler);

    this.mouseDownHandler = function (event) {
        inst.mouseDown(event);
    };
    this.skin.getEventDispatcher().addEventListener("mousedown", this.mouseDownHandler);

    this.mouseOverHandler = function (event) {
        inst.mouseOver(event);
    };
    this.skin.getEventDispatcher().addEventListener("mouseover", this.mouseOverHandler);

    this.mouseOutHandler = function (event) {
        inst.mouseOut(event);
    };
    this.skin.getEventDispatcher().addEventListener("mouseout", this.mouseOutHandler);
    this.skin.getEventDispatcher().addEventListener("rollout", this.mouseOutHandler);

    this.setEnabled(true);
}

/**
 * Sets label property in the skin
 * @param {string} label
 */
ButtonComponent.prototype.setLabel = function (label) {
    this.skin.setProperty("label", label);
};

/**
 * Changes skin state to over. Dispatches a click event
 * @param {object} event
 */
ButtonComponent.prototype.clicked = function (event) {
    if (this.enabled) {
        this.skin.changeState(ButtonComponent.STATE_OVER);

        if (this.pulseSkin) {
            this.pulseSkin.changeState("pulse");
        }

        this.dispatchEvent({type: "click", target: this});
    }
};

/**
 * Changes skin state to down
 * @param {object} event
 */
ButtonComponent.prototype.mouseDown = function (event) {
    if (this.enabled) {
        this.skin.changeState(ButtonComponent.STATE_DOWN);
    }
};

/**
 * Changes skin state to over
 * @param {object} event
 */
ButtonComponent.prototype.mouseOver = function (event) {
    this.stateWhenEnabled = ButtonComponent.STATE_OVER;
    if (this.enabled) {
        this.skin.changeState(ButtonComponent.STATE_OVER);
    }
};

/**
 * Changes the skin state to up
 * @param {object} event
 */
ButtonComponent.prototype.mouseOut = function (event) {
    this.stateWhenEnabled = ButtonComponent.STATE_UP;
    if (this.enabled) {
        this.skin.changeState(ButtonComponent.STATE_UP);
    }
};

/**
 * Disabled / enables the button. Sets the button state to disabled or up/over
 * @param {boolean} enabled
 */
ButtonComponent.prototype.setEnabled = function (enabled) {
    this.enabled = enabled;

    if (this.enabled) {
        this.skin.changeState(this.stateWhenEnabled);
    } else {
        this.skin.changeState(ButtonComponent.STATE_DISABLED);
    }
};

/**
 * Hides / shows the button
 * @param {boolean} enabled
 */
ButtonComponent.prototype.setVisible = function (visible) {
    this.visible = visible;

    this.skin.setProperty("visible", this.visible);
};

/**
 * Destroys the component
 */
ButtonComponent.prototype.destroy = function () {
    this.skin.getEventDispatcher().removeEventListener("click", this.clickHandler);
    this.skin.getEventDispatcher().removeEventListener("mousedown", this.mouseDownHandler);
    this.skin.getEventDispatcher().removeEventListener("mouseover", this.mouseOverHandler);
    this.skin.getEventDispatcher().removeEventListener("mouseout", this.mouseOutHandler);
    this.skin.getEventDispatcher().removeEventListener("rollout", this.mouseOutHandler);

    this.skin.destroy();

    Utils.clearObject(this);
};

ButtonComponent.STATE_UP = "up";
ButtonComponent.STATE_OVER = "over";
ButtonComponent.STATE_DOWN = "down";
ButtonComponent.STATE_DISABLED = "disabled";