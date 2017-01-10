goog.provide('com.epic.zfarm.inventory.v.manifest.InventoryManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function InventoryManifest() {
}

goog.inherits(InventoryManifest, EaselManifest);

InventoryManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_toolIcons"]);
    }
    return this.spriteSheetData;
};

InventoryManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_toolIcons.json"}
    ];

    images.push({id: "ZFarm_toolIcons", src: "assets/ZFarm_toolIcons.png"});

    return images;
};

InventoryManifest.NAME = "inventoryManifest";