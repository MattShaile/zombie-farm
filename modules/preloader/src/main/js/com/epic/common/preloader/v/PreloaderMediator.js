goog.provide('com.epic.common.preloader.v.PreloaderMediator');

goog.require('com.epic.common.preloader.PreloaderConstants');


/**
 * Mediator for the preloader, relays progress updates etc
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function PreloaderMediator(component) {
    puremvc.Mediator.call(this, "PreloaderMediator", component);
}
goog.inherits(PreloaderMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
PreloaderMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
PreloaderMediator.prototype.listNotificationInterests = function () {
    return [PreloaderConstants.WHEN_PRELOADER_PROGRESS, PreloaderConstants.DO_COMPLETE_PRELOADER];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
PreloaderMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case PreloaderConstants.WHEN_PRELOADER_PROGRESS:
            this.viewComponent.updateProgress(note.body.progress);
            break;
        case PreloaderConstants.DO_COMPLETE_PRELOADER:
            this.viewComponent.destroy();
            break;
    }
};
