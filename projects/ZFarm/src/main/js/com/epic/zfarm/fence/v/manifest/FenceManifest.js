goog.provide('com.epic.zfarm.fence.v.manifest.FenceManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function FenceManifest() {
}

goog.inherits(FenceManifest, EaselManifest);

FenceManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_fence"]);
    }
    return this.spriteSheetData;
};

FenceManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_fence.json"}
    ];

    images.push({id: "ZFarm_fence", src: "assets/ZFarm_fence.png"});

    return images;
};

FenceManifest.NAME = "FenceManifest";