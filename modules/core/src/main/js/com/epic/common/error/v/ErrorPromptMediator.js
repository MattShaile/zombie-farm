goog.provide('com.epic.common.error.v.ErrorPromptMediator');

goog.require('com.epic.common.error.ErrorConstants');


/**
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function ErrorPromptMediator(component) {
    puremvc.Mediator.call(this, "ErrorPromptMediator", component);

    component.addEventListener("ok", this);
}
goog.inherits(ErrorPromptMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
ErrorPromptMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "ok":
            this.facade.sendNotification(ErrorConstants.WHEN_ERROR_PROMPT_DISMISSED);
            break;
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
ErrorPromptMediator.prototype.listNotificationInterests = function () {
    return [ErrorConstants.DO_SHOW_ERROR_PROMPT, ErrorConstants.DO_HIDE_ERROR_PROMPT];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
ErrorPromptMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case ErrorConstants.DO_SHOW_ERROR_PROMPT:
            this.viewComponent.setText(note.getBody().message);
            this.viewComponent.setVisible(true);
            break;
        case ErrorConstants.DO_HIDE_ERROR_PROMPT:
            this.viewComponent.setVisible(false);
            break;
    }
};

