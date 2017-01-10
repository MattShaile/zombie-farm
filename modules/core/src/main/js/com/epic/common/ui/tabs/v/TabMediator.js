goog.provide('com.epic.common.ui.tabs.v.TabMediator');

goog.require('com.epic.common.ui.tabs.TabConstants');


/**
 * @param component view component class attached to this mediator
 *
 * @extends {puremvc.Mediator}
 * @constructor
 */
function TabMediator(component) {
    puremvc.Mediator.call(this, "TabMediator", component);

    component.addEventListener("change", this);
}
goog.inherits(TabMediator, puremvc.Mediator);

/**
 * Standard event handler function
 * @param event
 */
TabMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change":
            this.facade.sendNotification(TabConstants.WHEN_TAB_CHANGED, {"name": event.tabName});
            break;
    }
};


/**
 * Standard mediator function to register Notification Interests
 * @return {Array} List of the notifications this mediator is interested in
 */
TabMediator.prototype.listNotificationInterests = function () {
    return [TabConstants.DO_SET_TAB, TabConstants.DO_RESET_TAB, TabConstants.DO_SHOW_TABS, TabConstants.DO_HIDE_TABS];
};


/**
 * Standard mediator function to handle Notifications received
 * @param {puremvc.Notification} note The notification received
 */
TabMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case TabConstants.DO_SET_TAB:
            this.viewComponent.setTab(note.getBody().tabName);
            break;
        case TabConstants.DO_RESET_TAB:
            this.viewComponent.resetTab();
            break;
        case TabConstants.DO_SHOW_TABS:
            this.viewComponent.setVisible(true);
            break;
        case TabConstants.DO_HIDE_TABS:
            this.viewComponent.setVisible(false);
            break;
    }
};
