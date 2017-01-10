goog.provide('com.epic.zfarm.zombie.v.manifest.ZombieManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function ZombieManifest() {
}

goog.inherits(ZombieManifest, EaselManifest);

ZombieManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_zombie"]);
    }
    return this.spriteSheetData;
};

ZombieManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_zombie.json"}
    ];

    images.push({id: "ZFarm_zombie", src: "assets/ZFarm_zombie.png"});

    return images;
};

ZombieManifest.NAME = "ZombieManifest";