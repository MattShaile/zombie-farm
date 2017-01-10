goog.provide('com.epic.zfarm.navigation.v.NavigationButtonMediator');

goog.require('com.epic.zfarm.crops.note.CropDryNoteBody');
goog.require('com.epic.zfarm.navigation.note.NavigationEnabledNoteBody');
goog.require('com.epic.zfarm.navigation.note.NavigationNoteBody');
goog.require('com.epic.zfarm.navigation.v.component.NavigationButtonComponent');
goog.require('com.epic.zfarm.navigation.v.event.NavigationEvent');


function NavigationButtonMediator(component) {
    puremvc.Mediator.call(this, "NavigationButtonMediator", component);

    component.addEventListener(NavigationEvent.EVENT_SCROLL_STARTED, this);
    component.addEventListener(NavigationEvent.EVENT_SCROLL_COMPLETE, this);
}
goog.inherits(NavigationButtonMediator, puremvc.Mediator);

NavigationButtonMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case NavigationEvent.EVENT_SCROLL_STARTED:
            this.facade.sendNotification(NavigationNoteBody.WHEN_SCROLL_STARTED, new NavigationNoteBody(event.getToggled()));
            break;
        case NavigationEvent.EVENT_SCROLL_COMPLETE:
            this.facade.sendNotification(NavigationNoteBody.WHEN_SCROLL_COMPLETE, new NavigationNoteBody(event.getToggled()));
            break;
    }
};

NavigationButtonMediator.prototype.listNotificationInterests = function () {
    return [NavigationEnabledNoteBody.DO_SET_NAVIGATION_ENABLED, CropDryNoteBody.DO_UPDATE_DRY_CROPS_COUNT];
};

NavigationButtonMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case NavigationEnabledNoteBody.DO_SET_NAVIGATION_ENABLED:
            this.getViewComponent().setEnabled(note.getBody().getEnabled());
            break;
        case CropDryNoteBody.DO_UPDATE_DRY_CROPS_COUNT:
            this.getViewComponent().setNumDry(note.getBody().numDryCrops);
            break;
    }
};

/**
 * @returns {NavigationButtonComponent}
 */
NavigationButtonMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};