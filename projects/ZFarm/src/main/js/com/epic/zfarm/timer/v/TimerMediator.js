goog.provide('com.epic.zfarm.timer.v.TimerMediator');

goog.require('com.epic.zfarm.timer.note.TimerNoteBody');
goog.require('com.epic.zfarm.timer.note.TimerPositionNoteBody');
goog.require('com.epic.zfarm.timer.v.component.TimerComponent');


function TimerMediator(component) {
    puremvc.Mediator.call(this, "TimerMediator", component);

    //component.addEventListener("complete", this);
}
goog.inherits(TimerMediator, puremvc.Mediator);

TimerMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "complete":
            //this.facade.sendNotification(NOTE_NAME);
            break;
    }
};

TimerMediator.prototype.listNotificationInterests = function () {
    return [TimerNoteBody.DO_UPDATE_PERCENT, TimerNoteBody.DO_HIDE, TimerNoteBody.DO_SHOW, TimerPositionNoteBody.DO_SET_X];
};

TimerMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case TimerNoteBody.DO_UPDATE_PERCENT:
            this.getViewComponent().setPercent(note.getBody().percent);
            break;
        case TimerNoteBody.DO_HIDE:
            this.getViewComponent().setVisible(false);
            this.getViewComponent().setPercent(note.getBody().percent);
            break;
        case TimerNoteBody.DO_SHOW:
            this.getViewComponent().setVisible(true);
            this.getViewComponent().setPercent(note.getBody().percent);
            break;
        case TimerPositionNoteBody.DO_SET_X:
            this.getViewComponent().setX(note.getBody().x);
            break;
    }
};

/**
 * @returns {TimerComponent}
 */
TimerMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};