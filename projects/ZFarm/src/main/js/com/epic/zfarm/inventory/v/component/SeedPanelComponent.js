goog.provide('com.epic.zfarm.inventory.v.component.SeedPanelComponent');

goog.require('com.epic.zfarm.inventory.v.component.AbstractInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryItemComponent');
goog.require('com.epic.zfarm.inventory.v.skin.SeedPanelSkin');


/**
 * @constructor
 * @extends {AbstractInventoryComponent}
 * @param skin {SeedPanelSkin}
 */
SeedPanelComponent = function(skin) {
    goog.base(this, skin);

    createjs.EventDispatcher.initialize(SeedPanelComponent.prototype);
};

goog.inherits(SeedPanelComponent, AbstractInventoryComponent);


/**
 * Adds an inventory button to the collection on start up
 * @param button {InventoryItemComponent}
 */
SeedPanelComponent.prototype.addInventoryItem = function (button) {
    button.addEventListener("click", this);

    this.inventoryButtons.push(button);

    this.layoutButtons();
};

SeedPanelComponent.prototype.layoutButtons = function () {

    var index = 0;
    for (var i = 0; i < SeedPanelComponent.ICONS_HIGH; i++) {
        for (var j = 0; j < SeedPanelComponent.ICONS_WIDE; j++) {
            var button = this.inventoryButtons[index];

            if (button) {
                button.skin.setProperty("x", this.skin.getProperty("x") + 10 + (100 * j));
                button.skin.setProperty("y", this.skin.getProperty("y") + 10 + (100 * i));
            }

            index++;
        }
    }

};

SeedPanelComponent.ICONS_HIGH = 5;
SeedPanelComponent.ICONS_WIDE = 3;