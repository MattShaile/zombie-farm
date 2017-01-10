goog.provide('com.epic.zfarm.menu.v.manifest.MenuManifest');

goog.require('com.epic.common.core.v.EaselManifest');


/**
 * @constructor
 * @extends {EaselManifest}
 */
function MenuManifest() {
}

goog.inherits(MenuManifest, EaselManifest);

MenuManifest.prototype.getSpriteSheetData = function () {
    if (!this.spriteSheetData) {
        this.spriteSheetData = this.images.spriteSheetJSON;
        this.spriteSheetData.images = [];
        this.spriteSheetData.images.push(this.images["ZFarm_menuButtons"]);
    }
    return this.spriteSheetData;
};

MenuManifest.prototype.getImages = function () {
    var images = [
        {id: "spriteSheetJSON", src: "assets/ZFarm_menuButtons.json"}
    ];

    images.push({id: "ZFarm_menuButtons", src: "assets/ZFarm_menuButtons.png"});

    return images;
};

MenuManifest.NAME = "MenuManifest";