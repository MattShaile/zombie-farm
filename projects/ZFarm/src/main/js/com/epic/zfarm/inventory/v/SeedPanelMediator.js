goog.provide('com.epic.zfarm.inventory.v.SeedPanelMediator');

goog.require('com.epic.zfarm.inventory.note.InventoryNoteBody');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');
goog.require('com.epic.zfarm.inventory.v.component.SeedPanelComponent');
goog.require('com.epic.zfarm.inventory.v.event.InventoryEvent');


function SeedPanelMediator(component) {
    puremvc.Mediator.call(this, "SeedPanelMediator", component);

    this.getViewComponent().addEventListener(InventoryEvent.EVENT_ITEM_CLICKED, this);
}
goog.inherits(SeedPanelMediator, puremvc.Mediator);

SeedPanelMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case InventoryEvent.EVENT_ITEM_CLICKED:
            this.facade.sendNotification(InventoryNoteBody.WHEN_ITEM_CLICKED, new InventoryNoteBody(event.getId(), this.getViewComponent().getInventoryType()));
            break;
    }
};

SeedPanelMediator.prototype.listNotificationInterests = function () {
    return [InventoryToggleNoteBody.DO_SHOW,
            InventoryToggleNoteBody.DO_HIDE];
};

SeedPanelMediator.prototype.handleNotification = function (note) {
    if(this.appliesToThisInventory(note.getBody().getInventoryType()))
    {
        switch (note.getName()) {
            case InventoryToggleNoteBody.DO_SHOW:
                this.getViewComponent().show();
                break;
            case InventoryToggleNoteBody.DO_HIDE:
                this.getViewComponent().hide();
                break;
        }
    }
};

SeedPanelMediator.prototype.appliesToThisInventory = function (inventoryType) {
    return this.getViewComponent().inventoryIsType(inventoryType);
};

/**
 * @returns {SeedPanelComponent}
 */
SeedPanelMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};