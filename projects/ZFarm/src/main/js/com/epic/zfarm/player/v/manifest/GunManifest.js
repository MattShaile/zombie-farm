goog.provide('com.epic.zfarm.player.v.manifest.GunManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function GunManifest() {
}

goog.inherits(GunManifest, EaselManifest);

GunManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_guns"]);
    }
    return this.spriteSheetData;
};

GunManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_guns.json"}
    ];

    images.push({id: "ZFarm_guns", src: "assets/ZFarm_guns.png"});

    return images;
};

GunManifest.NAME = "gunManifest";