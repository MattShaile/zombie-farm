goog.provide('com.epic.zfarm.menu.v.MenuMediator');

goog.require('com.epic.zfarm.menu.note.MenuNoteBody');
goog.require('com.epic.zfarm.menu.v.component.MenuComponent');
goog.require('com.epic.zfarm.menu.v.event.MenuEvent');


function MenuMediator(component) {
    goog.base(this, MenuMediator.NAME, component);

    this.getViewComponent().addEventListener(MenuEvent.EVENT_PLAY_CLICKED, this);
}
goog.inherits(MenuMediator, puremvc.Mediator);

MenuMediator.NAME = "MenuMediator";

MenuMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case MenuEvent.EVENT_PLAY_CLICKED:
            this.facade.sendNotification(MenuNoteBody.WHEN_PLAY_CLICKED);
            break;
    }
};

MenuMediator.prototype.listNotificationInterests = function () {
    return [];
};

MenuMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
    }
};

MenuMediator.prototype.onRemove = function () {
    this.getViewComponent().removeEventListener(MenuEvent.EVENT_PLAY_CLICKED, this);

    this.getViewComponent().destroy();

    this.viewComponent = null;

    goog.base(this, "onRemove");
};

/**
 * @returns {MenuComponent}
 */
MenuMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};