goog.provide('com.epic.zfarm.inventory.v.InventoryMediator');

goog.require('com.epic.zfarm.inventory.note.InventoryNoteBody');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');
goog.require('com.epic.zfarm.inventory.v.component.IInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryComponent');
goog.require('com.epic.zfarm.inventory.v.event.InventoryEvent');


/**
 * @param component {IInventoryComponent}
 * @constructor
 */
function InventoryMediator(component) {
    puremvc.Mediator.call(this, "InventoryMediator" + component.getInventoryType(), component);

    this.getViewComponent().addEventListener(InventoryEvent.EVENT_ITEM_CLICKED, this);
}
goog.inherits(InventoryMediator, puremvc.Mediator);

InventoryMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case InventoryEvent.EVENT_ITEM_CLICKED:
            this.facade.sendNotification(InventoryNoteBody.WHEN_ITEM_CLICKED, new InventoryNoteBody(event.getId(), this.getViewComponent().getInventoryType()));
            break;
    }
};

InventoryMediator.prototype.listNotificationInterests = function () {
    return [InventoryNoteBody.DO_ITEM_SELECTED,
            InventoryNoteBody.DO_INDICATE_CORRECT_ICON,
            InventoryToggleNoteBody.DO_SHOW,
            InventoryToggleNoteBody.DO_HIDE];
};

/**
 * @param note {Notification}
 */
InventoryMediator.prototype.handleNotification = function (note)
{
    if(this.appliesToThisInventory(note.getBody().getInventoryType()))
    {
        switch (note.getName()) {
            case InventoryNoteBody.DO_ITEM_SELECTED:
                this.getViewComponent().setSelectedItem(note.getBody().getId());
                break;
            case InventoryNoteBody.DO_INDICATE_CORRECT_ICON:
                this.getViewComponent().setCorrectItem(note.getBody().getId());
                break;
            case InventoryToggleNoteBody.DO_SHOW:
                this.getViewComponent().show();
                break;
            case InventoryToggleNoteBody.DO_HIDE:
                this.getViewComponent().hide();
                break;
        }
    }
};

InventoryMediator.prototype.appliesToThisInventory = function (inventoryType) {
    return this.getViewComponent().inventoryIsType(inventoryType);
};

/**
 * @returns {InventoryComponent}
 */
InventoryMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};