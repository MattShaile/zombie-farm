goog.provide('com.epic.zfarm.navigation.v.event.NavigationEvent');




/**
 * @constructor
 * @param {Number}
 */
function NavigationEvent(type, target, toggled) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;

    /**
     * @type {Boolean}
     */
    this.toggled = toggled;
};

/**
 * Get whether or not the toggle button is toggled or not (toggled = zombie screen, not toggled = farm screen)
 * @returns {Boolean}
 */
NavigationEvent.prototype.getToggled = function () {
    return this.toggled;
}

/**
 * @type {string}
 */
NavigationEvent.EVENT_SCROLL_STARTED = "eventScrollStarted";
NavigationEvent.EVENT_SCROLL_COMPLETE = "eventScrollComplete";