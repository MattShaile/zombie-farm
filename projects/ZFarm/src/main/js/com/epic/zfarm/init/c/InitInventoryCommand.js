goog.provide('com.epic.zfarm.init.c.InitInventoryCommand');

goog.require('com.epic.zfarm.inventory.m.InventoryProxy');
goog.require('com.epic.zfarm.inventory.m.vo.FarmItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ZombieItemConfigVO');
goog.require('com.epic.zfarm.inventory.note.InventoryNoteBody');
goog.require('com.epic.zfarm.inventory.note.InventoryToggleNoteBody');
goog.require('com.epic.zfarm.inventory.v.component.IInventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryComponent');
goog.require('com.epic.zfarm.inventory.v.component.InventoryItemComponent');
goog.require('com.epic.zfarm.inventory.v.component.SeedPanelComponent');
goog.require('com.epic.zfarm.inventory.v.InventoryMediator');
goog.require('com.epic.zfarm.inventory.v.manifest.InventoryManifest');
goog.require('com.epic.zfarm.inventory.v.SeedPanelMediator');
goog.require('com.epic.zfarm.inventory.v.skin.InventoryItemSkin');
goog.require('com.epic.zfarm.inventory.v.skin.InventorySkin');
goog.require('com.epic.zfarm.inventory.v.skin.SeedPanelSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitInventoryCommand() {

}

goog.inherits(InitInventoryCommand, puremvc.SimpleCommand);

InitInventoryCommand.prototype.execute = function (note) {
    this.registerProxies();
    this.registerMediators();

};

InitInventoryCommand.prototype.registerProxies = function () {
    var inventoryProxy = new InventoryProxy();
    inventoryProxy.registerInventory(FarmItemConfigVO.getAll(), FarmItemConfigVO.INVENTORY_TYPE);
    inventoryProxy.registerInventory(SeedPacketItemConfigVO.getAll(), SeedPacketItemConfigVO.INVENTORY_TYPE);
    inventoryProxy.registerInventory(ZombieItemConfigVO.getAll(), ZombieItemConfigVO.INVENTORY_TYPE);

    this.facade.registerProxy(inventoryProxy);

    inventoryProxy.setSelectedInventoryItem(FarmItemConfigVO.FORK);
};

InitInventoryCommand.prototype.registerMediators = function () {
    var inventoryManifest = AssetLib.getManifest(InventoryManifest.NAME);

    this.setupInventories(inventoryManifest);

    this.setupSeedPanel(inventoryManifest);
};

InitInventoryCommand.prototype.setupInventories = function (inventoryManifest) {
    this.setupInventory(inventoryManifest, FarmItemConfigVO.getAll(), FarmItemConfigVO.INVENTORY_TYPE, 0, 100);
    this.setupInventory(inventoryManifest, ZombieItemConfigVO.getAll(), ZombieItemConfigVO.INVENTORY_TYPE, 400, 100);

    this.facade.sendNotification(InventoryToggleNoteBody.DO_HIDE, new InventoryToggleNoteBody(ZombieItemConfigVO.INVENTORY_TYPE));
};

InitInventoryCommand.prototype.setupSeedPanel = function (inventoryManifest) {
    var root = StageSetup.overlayContainer;

    var seedPanelSkin = new SeedPanelSkin(inventoryManifest);

    var width = 300;
    var height = 300;
    seedPanelSkin.init(width, height);
    seedPanelSkin.setProperty("x", (StageSetup.canvas.width - width) * 0.5);
    seedPanelSkin.setProperty("y", (StageSetup.canvas.height - height) * 0.5);

    seedPanelSkin.addToContainer(root);

    var seedPanelComponent = new SeedPanelComponent(seedPanelSkin);
    seedPanelComponent.init(SeedPacketItemConfigVO.INVENTORY_TYPE);

    this.addItemsToComponent(inventoryManifest, SeedPacketItemConfigVO.getAll(), seedPanelComponent);

    var seedPanelMediator = new SeedPanelMediator(seedPanelComponent);

    this.facade.registerMediator(seedPanelMediator);

    this.facade.sendNotification(InventoryToggleNoteBody.DO_HIDE, new InventoryToggleNoteBody(SeedPacketItemConfigVO.INVENTORY_TYPE));
};

InitInventoryCommand.prototype.setupInventory = function (inventoryManifest, itemNames, inventoryType, x, y) {
    var root = StageSetup.overlayContainer;

    var inventorySkin = new InventorySkin(inventoryManifest);

    inventorySkin.init();
    inventorySkin.setProperty("x", x);
    inventorySkin.setProperty("y", y);

    inventorySkin.addToContainer(root);

    var inventoryComponent = new InventoryComponent(inventorySkin);
    inventoryComponent.init(inventoryType);

    this.addItemsToComponent(inventoryManifest, itemNames, inventoryComponent);

    var inventoryMediator = new InventoryMediator(inventoryComponent);

    this.facade.registerMediator(inventoryMediator);

    this.facade.sendNotification(InventoryNoteBody.DO_ITEM_SELECTED, new InventoryNoteBody(itemNames[0].id, inventoryType));
};

/**
 *
 * @param manifest
 * @param itemNames
 * @param component {IInventoryComponent}
 */
InitInventoryCommand.prototype.addItemsToComponent = function (manifest, itemNames, component) {

    var root = StageSetup.overlayContainer;

    var itemSkin;
    var item;
    var itemComponent;

    for (var i = 0; i < itemNames.length; i++) {

        item = itemNames[i];
        itemSkin = new InventoryItemSkin(manifest);
        itemComponent = new InventoryItemComponent(itemSkin);
        itemComponent.setID(item.id);
        itemSkin.init(item.label);

        itemSkin.addToContainer(root);

        component.addInventoryItem(itemComponent);
    }
};