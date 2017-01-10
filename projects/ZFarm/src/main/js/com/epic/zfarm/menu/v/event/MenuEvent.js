goog.provide('com.epic.zfarm.menu.v.event.MenuEvent');




/**
 * @constructor
 */
function MenuEvent(type, target) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;
};

/**
 * @type {string}
 */
MenuEvent.EVENT_PLAY_CLICKED = "eventMenuPlayClicked";