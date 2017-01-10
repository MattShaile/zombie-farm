goog.provide('com.epic.zfarm.navigation.note.NavigationNoteBody');




/**
 * @param toggled {Boolean}
 * @constructor
 */
function NavigationNoteBody(toggled) {
    this.toggled = toggled;
};

/**
 * @returns {Boolean}
 */
NavigationNoteBody.prototype.getToggled = function () {
    return this.toggled;
};

NavigationNoteBody.WHEN_SCROLL_STARTED = "whenNavigationScrollStarted";
NavigationNoteBody.WHEN_SCROLL_COMPLETE = "whenNavigationScrollComplete";