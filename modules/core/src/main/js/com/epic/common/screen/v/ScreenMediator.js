goog.provide('com.epic.common.screen.v.ScreenMediator');

goog.require('com.epic.common.screen.m.ScreenConstants');


/**
 * Mediator for the main screen. Handles resizing and orientation etc
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function ScreenMediator(component) {
    puremvc.Mediator.call(this, "ScreenMediator", component);
}
goog.inherits(ScreenMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
ScreenMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
ScreenMediator.prototype.listNotificationInterests = function () {
    return [ScreenConstants.DO_INITIALIZE, ScreenConstants.DO_SWITCH_BACKGROUND, ScreenConstants.DO_SET_MODE];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
ScreenMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case ScreenConstants.DO_INITIALIZE:
            this.viewComponent.init();
            break;
        case ScreenConstants.DO_SET_MODE:
            this.viewComponent.setMode(note.getBody().mode);
            break;
        case ScreenConstants.DO_SWITCH_BACKGROUND:
            this.viewComponent.switchBackground(note.getBody().src);
            break;
    }
};
