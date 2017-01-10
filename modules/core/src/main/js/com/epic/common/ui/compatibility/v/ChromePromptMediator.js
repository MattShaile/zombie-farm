goog.provide('com.epic.common.ui.compatibility.v.ChromePromptMediator');

goog.require('com.epic.common.ui.compatibility.CompatibilityConstants');


/**
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function ChromePromptMediator(component) {
    puremvc.Mediator.call(this, "ChromePromptMediator", component);

    component.addEventListener("ok", this);
}
goog.inherits(ChromePromptMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
ChromePromptMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "ok":
            this.facade.sendNotification(CompatibilityConstants.WHEN_CHROME_PROMPT_DISMISSED);
            break;
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
ChromePromptMediator.prototype.listNotificationInterests = function () {
    return [CompatibilityConstants.DO_SHOW_CHROME_PROMPT, CompatibilityConstants.DO_HIDE_CHROME_PROMPT];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
ChromePromptMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case CompatibilityConstants.DO_SHOW_CHROME_PROMPT:
            this.viewComponent.setText(note.getBody().message);
            this.viewComponent.setVisible(true);
            break;
        case CompatibilityConstants.DO_HIDE_CHROME_PROMPT:
            this.viewComponent.setVisible(false);
            break;
    }
};

