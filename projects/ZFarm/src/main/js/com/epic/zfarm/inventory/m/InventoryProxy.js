goog.provide('com.epic.zfarm.inventory.m.InventoryProxy');

goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');


function InventoryProxy() {
    var dataObject = {
        "selectedInventoryItem": null,
        "selectedSeedPacket": null,
        "inventories": {}
    };

    puremvc.Proxy.call(this, InventoryProxy.NAME, dataObject);
}

goog.inherits(InventoryProxy, puremvc.Proxy);

InventoryProxy.NAME = "InventoryProxy";

/**
 * @returns {ItemConfigVO}
 */
InventoryProxy.prototype.getSelectedInventoryItem = function () {
    return this.data.selectedInventoryItem;
};

/**
 * @param value {ItemConfigVO}
 */
InventoryProxy.prototype.setSelectedInventoryItem = function (value) {
    this.data.selectedInventoryItem = value;
    this.setSelectedSeedPacketItem(null);
};

/**
 * @param itemID {Number}
 * @param inventoryName {String}
 */
InventoryProxy.prototype.setSelectedInventoryItemBy = function (itemID, inventoryName) {
    this.setSelectedInventoryItem(this.findInventoryItemBy(itemID, inventoryName));
};

/**
 * @param value {SeedPacketItemConfigVO}
 */
InventoryProxy.prototype.setSelectedSeedPacketItem = function (value) {
    this.data.selectedSeedPacket = value;
};

/**
 * @return {SeedPacketItemConfigVO}
 */
InventoryProxy.prototype.getSelectedSeedPacketItem = function () {
    return this.data.selectedSeedPacket;
};

/**
 * @param itemID {Number}
 * @param inventoryName {String}
 */
InventoryProxy.prototype.setSelectedSeedPacketItemBy = function (itemID, inventoryName) {
    this.setSelectedSeedPacketItem(this.findInventoryItemBy(itemID, inventoryName));
};

/**
 * @param itemID {Number}
 * @param inventoryName {String}
 */
InventoryProxy.prototype.findInventoryItemBy = function (itemID, inventoryName) {
    var inventory = this.data.inventories[inventoryName];
    if(inventory)
    {
        for(var i = 0; i < inventory.length; i++)
        {
            if(inventory[i].id == itemID)
            {
                return inventory[i];
            }
        }
    }

    return null;
};

/**
 * @param inventoryItems {Array}
 * @param inventoryName {String}
 */
InventoryProxy.prototype.registerInventory = function (inventoryItems, inventoryName){
    this.data.inventories[inventoryName] = inventoryItems;
};