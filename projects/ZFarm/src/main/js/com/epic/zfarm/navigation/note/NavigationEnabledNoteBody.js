goog.provide('com.epic.zfarm.navigation.note.NavigationEnabledNoteBody');




/**
 * @param enabled {Boolean}
 * @constructor
 */
function NavigationEnabledNoteBody(enabled) {
    /**
     * @type {Boolean}
     */
    this.enabled = enabled;
};

/**
 * @returns {Boolean}
 */
NavigationEnabledNoteBody.prototype.getEnabled = function () {
    return this.enabled;
};


NavigationEnabledNoteBody.DO_SET_NAVIGATION_ENABLED = "doNavigationSetEnabled";