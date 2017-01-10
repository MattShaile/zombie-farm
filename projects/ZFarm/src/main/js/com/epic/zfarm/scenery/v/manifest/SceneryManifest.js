goog.provide('com.epic.zfarm.scenery.v.manifest.SceneryManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function SceneryManifest() {
}

goog.inherits(SceneryManifest, EaselManifest);

SceneryManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_background"]);
    }
    return this.spriteSheetData;
};

SceneryManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_background.json"}
    ];

    images.push({id: "ZFarm_background", src: "assets/ZFarm_background.png"});

    return images;
};

SceneryManifest.NAME = "sceneryManifest";