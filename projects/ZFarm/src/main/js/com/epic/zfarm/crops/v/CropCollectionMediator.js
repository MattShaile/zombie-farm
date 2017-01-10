goog.provide('com.epic.zfarm.crops.v.CropCollectionMediator');

goog.require('com.epic.zfarm.crops.note.CropNoteBody');
goog.require('com.epic.zfarm.crops.note.CropStateNoteBody');
goog.require('com.epic.zfarm.crops.v.component.CropComponent');
goog.require('com.epic.zfarm.crops.v.event.CropEvent');


function CropCollectionMediator(component) {
    puremvc.Mediator.call(this, "CropCollectionMediator", component);

    component.addEventListener(CropEvent.EVENT_CROP_CLICKED, this);
}
goog.inherits(CropCollectionMediator, puremvc.Mediator);

CropCollectionMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case CropEvent.EVENT_CROP_CLICKED:
            this.facade.sendNotification(CropNoteBody.WHEN_CROP_CLICKED, new CropNoteBody(event.getId()));
            break;
    }
};

CropCollectionMediator.prototype.listNotificationInterests = function () {
    return [CropStateNoteBody.DO_UPDATE_STATE, CropNoteBody.DO_SHOW_CROP_DRY_PROMPT, CropNoteBody.DO_HIDE_CROP_DRY_PROMPT];
};

CropCollectionMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case CropStateNoteBody.DO_UPDATE_STATE:
            this.getViewComponent().setCropState(note.getBody().id, note.getBody().soilFrame, note.getBody().cropName, note.getBody().cropStage);
            break;
        case CropNoteBody.DO_SHOW_CROP_DRY_PROMPT:
            this.getViewComponent().setCropDry(note.getBody().id, true);
            break;
        case CropNoteBody.DO_HIDE_CROP_DRY_PROMPT:
            this.getViewComponent().setCropDry(note.getBody().id, false);
            break;
    }
};

/**
 * @returns {CropComponent}
 */
CropCollectionMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};