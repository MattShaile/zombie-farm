goog.provide('com.epic.zfarm.navigation.v.manifest.NavigationManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function NavigationManifest() {
}

goog.inherits(NavigationManifest, EaselManifest);

NavigationManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_navigation"]);
    }
    return this.spriteSheetData;
};

NavigationManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_navigation.json"}
    ];

    images.push({id: "ZFarm_navigation", src: "assets/ZFarm_navigation.png"});

    return images;
};

NavigationManifest.NAME = "navigationManifest";