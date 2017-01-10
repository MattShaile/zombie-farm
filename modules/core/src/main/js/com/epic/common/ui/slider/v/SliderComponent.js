goog.provide('com.epic.common.ui.slider.v.SliderComponent');

goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * Slider component
 * @param {ISkin} skin
 * @param {number} min   Minimum value
 * @param {number} max   Maximum value
 * @param {number} step  Step between values. 0 = unlimited
 * @param {Button} [upButton=null]  A button for stepping up the slider
 * @param {Button} [downButton=null]  A button for stepping down the slider
 * @constructor
 */
function SliderComponent(skin, min, max, step, upButton, downButton) {
    // Default params
    /*
     * @type {Button}
     */
    this.upButton = typeof upButton !== 'undefined' ? upButton : null;
    /*
     * @type {Button}
     */
    this.downButton = typeof downButton !== 'undefined' ? downButton : null;


    // Initialize createjs EventDispatcher class
    createjs.EventDispatcher.initialize(SliderComponent.prototype);

    /**
     * @type {ISkin}
     */
    this.skin = skin;
    this.skin.init();

    /**
     * Minimum value
     * @type {number}
     */
    this.min = min;
    /**
     * Maximum value
     * @type {number}
     */
    this.max = max;
    /**
     * Step between values. 0 = unlimited
     * @type {number}
     */
    this.step = step;
    /**
     * Value the slider is on
     * @type {boolean}
     */
    this.value = min;

    /**
     * Whether the handle is currently being dragged
     * @type {boolean}
     */
    this.dragging = false;

    /**
     * @type {boolean}
     */
    this.enabled = true;

    this.refresh();

    this.setupEventListeners();

    this.setEnabled(true);
}

/**
 * Sets up the event listeners for the slider
 */
SliderComponent.prototype.setupEventListeners = function () {
    var inst = this;

    this.clickHandler = function (event) {
        inst.clicked(event);
    };
    this.skin.getEventDispatcher().addEventListener("clicked", this.clickHandler);

    this.startDragHandler = function (event) {
        inst.startDrag(event);
    };
    this.skin.getEventDispatcher().addEventListener("startdrag", this.startDragHandler);

    this.dragHandler = function (event) {
        inst.drag(event);
    };
    this.skin.getEventDispatcher().addEventListener("drag", this.dragHandler);

    this.upHandler = function (event) {
        inst.upClicked(event);
    };
    if (this.upButton) {
        this.upButton.addEventListener("click", this.upHandler);
    }

    this.downHandler = function (event) {
        inst.downClicked(event);
    };
    if (this.downButton) {
        this.downButton.addEventListener("click", this.downHandler);
    }

    this.setEnabled(true);
};

/**
 * Anywhere on the slider or handle is clicked (mouse up)
 * @param event
 */
SliderComponent.prototype.clicked = function (event) {
    var percent = event.percent;

    this.dragging = false;

    this.setValue(this.getValueFromPercent(percent));
};

/**
 * Mouse is clicked (mouse down) anywhere on the slider or handle
 * @param event
 */
SliderComponent.prototype.startDrag = function (event) {
    this.dragging = true;
};

/**
 * Mouse is dragged across the slider
 * @param event
 */
SliderComponent.prototype.drag = function (event) {
    if (this.dragging) {
        var percent = event.percent;

        this.setValue(this.getValueFromPercent(percent));
    }
};

/**
 * Re-sets value causing the slider to redraw
 */
SliderComponent.prototype.refresh = function () {
    var refreshValue = this.value;
    this.value = null;
    this.setValue(refreshValue);
    this.skin.setProperty("steps", (this.max - this.min) / this.step);
};

/**
 * Sets the slider value and dispatches a change event
 * @param value
 */
SliderComponent.prototype.setValue = function (value) {
    if (value != this.value) {
        this.value = value;
        this.skin.setProperty("percent", (this.value - this.min) / (this.max - this.min));

        this.dispatchEvent({type: "change", value: this.value});
    }

    // Disable buttons on extents
    this.upButton.setEnabled(this.enabled);
    this.downButton.setEnabled(this.enabled);

    if (this.value >= this.max) {
        this.upButton.setEnabled(false);
    } else if (this.value <= this.min) {
        this.downButton.setEnabled(false);
    }
};

/**
 * Converts a percent value (how far the handle has been moved across the slider) and converts this to a valid step between min and max
 * @param percent   How far along the slider the handle is
 * @returns {*}
 */
SliderComponent.prototype.getValueFromPercent = function (percent) {
    var newValue;
    if (this.step == 0) {
        newValue = this.min + (this.max - this.min) * percent;
    } else {
        newValue = this.min + Math.round(((this.max - this.min) * percent) / this.step) * this.step;
    }

    return newValue;
};

/**
 * Up arrow clicked
 * @param event
 */
SliderComponent.prototype.upClicked = function (event) {
    this.setValue(Math.min(this.max, this.value + this.step));
};

/**
 * Down arrow clicked
 * @param event
 */
SliderComponent.prototype.downClicked = function (event) {
    this.setValue(Math.max(this.min, this.value - this.step));
};

/**
 * Disabled / enables the slider. Sets the slider skin state to enabled or disabled
 * @param {boolean} enabled
 */
SliderComponent.prototype.setEnabled = function (enabled) {
    this.enabled = enabled;

    if (this.enabled) {
        this.skin.changeState("enabled");
    } else {
        this.skin.changeState("disabled");
    }
};
