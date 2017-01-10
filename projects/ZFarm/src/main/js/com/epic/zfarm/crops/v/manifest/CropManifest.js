goog.provide('com.epic.zfarm.crops.v.manifest.CropManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function CropManifest() {
}

goog.inherits(CropManifest, EaselManifest);

CropManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_crops"]);
    }
    return this.spriteSheetData;
};

CropManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_crops.json"}
    ];

    images.push({id: "ZFarm_crops", src: "assets/ZFarm_crops.png"});

    return images;
};

CropManifest.NAME = "cropsManifest";