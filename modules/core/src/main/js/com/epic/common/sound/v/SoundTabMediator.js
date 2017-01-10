goog.provide('com.epic.common.sound.v.SoundTabMediator');

goog.require('com.epic.common.sound.SoundConstants');


/**
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function SoundTabMediator(component) {
    puremvc.Mediator.call(this, "SoundTabMediator", component);

    component.addEventListener("change", this);
}
goog.inherits(SoundTabMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
SoundTabMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change":
            this.facade.sendNotification(SoundConstants.WHEN_MUTE_CHANGED, {"mute": event.toggled});
            break;
    }

};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
SoundTabMediator.prototype.listNotificationInterests = function () {
    return [SoundConstants.DO_SHOW_SOUND_TAB, SoundConstants.DO_HIDE_SOUND_TAB, SoundConstants.DO_UPDATE_MUTE];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
SoundTabMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case SoundConstants.DO_SHOW_SOUND_TAB:
            this.viewComponent.setVisible(true);
            break;
        case SoundConstants.DO_HIDE_SOUND_TAB:
            this.viewComponent.setVisible(false);
            break;
        case SoundConstants.DO_UPDATE_MUTE:
            this.viewComponent.setMute(note.getBody().mute);
            break;
    }
};
