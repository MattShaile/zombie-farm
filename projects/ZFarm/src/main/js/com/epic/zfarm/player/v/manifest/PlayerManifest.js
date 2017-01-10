goog.provide('com.epic.zfarm.player.v.manifest.PlayerManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function PlayerManifest() {
}

goog.inherits(PlayerManifest, EaselManifest);

PlayerManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_player"]);
    }
    return this.spriteSheetData;
};

PlayerManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_player.json"}
    ];

    images.push({id: "ZFarm_player", src: "assets/ZFarm_player.png"});

    return images;
};

PlayerManifest.NAME = "playerManifest";