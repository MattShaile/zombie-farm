goog.provide('com.epic.common.sound.v.SoundConfirmMediator');

goog.require('com.epic.common.sound.SoundConstants');


/**
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function SoundConfirmMediator(component) {
    puremvc.Mediator.call(this, "SoundConfirmMediator", component);

    component.addEventListener("ok", this);
    component.addEventListener("cancel", this);
}
goog.inherits(SoundConfirmMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
SoundConfirmMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "ok":
            this.facade.sendNotification(SoundConstants.WHEN_SOUND_SELECTED, {"mute": false});
            break;
        case "cancel":
            this.facade.sendNotification(SoundConstants.WHEN_SOUND_SELECTED, {"mute": true});
            break;
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
SoundConfirmMediator.prototype.listNotificationInterests = function () {
    return [SoundConstants.DO_SHOW_SOUND_CONFIRM, SoundConstants.DO_HIDE_SOUND_CONFIRM];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
SoundConfirmMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case SoundConstants.DO_SHOW_SOUND_CONFIRM:
            this.viewComponent.setText(note.getBody().message);
            this.viewComponent.setVisible(true);
            break;
        case SoundConstants.DO_HIDE_SOUND_CONFIRM:
            this.viewComponent.setVisible(false);
            break;
    }
};

