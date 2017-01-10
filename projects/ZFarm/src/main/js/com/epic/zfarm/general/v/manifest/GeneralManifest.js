goog.provide('com.epic.zfarm.general.v.manifest.GeneralManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function GeneralManifest() {
}

goog.inherits(GeneralManifest, EaselManifest);

GeneralManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_general"]);
    }
    return this.spriteSheetData;
};

GeneralManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_general.json"}
    ];

    images.push({id: "ZFarm_general", src: "assets/ZFarm_general.png"});

    return images;
};

GeneralManifest.NAME = "generalManifest";