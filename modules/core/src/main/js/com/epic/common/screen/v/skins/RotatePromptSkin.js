goog.provide('com.epic.common.screen.v.skins.RotatePromptSkin');

goog.require('com.epic.common.core.v.EaselManifest');
goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');


/**
 *
 * Displays the "rotate your phone" prompt
 * @constructor
 * @implements {ISkin}
 * @param {EaselManifest} manifest
 */
function RotatePromptSkin(manifest) {
    goog.base(this, manifest);
}

goog.inherits(RotatePromptSkin, EaselSkin);

/**
 * Initializes the skin creating it's container and any other assets it needs from the start
 */
RotatePromptSkin.prototype.init = function () {
    this.rotatePrompt = new createjs.Sprite(this.manifest.getSpriteSheet());
    this.rotatePrompt.gotoAndStop("rotatePrompt");
    this.rotatePrompt.visible = false;

     this.container.addChild(this.rotatePrompt);
};

/**
 * Changes the state of the skin
 * @param {string} state
 */
RotatePromptSkin.prototype.changeState = function (state) {
    if (state == "visible") {
        this.rotatePrompt.visible = true;

        this.rotatePrompt.rotation = 0;
        this.rotatePrompt.alpha = 1;

        createjs.Tween.removeTweens(this.rotatePrompt);
        createjs.Tween.get(this.rotatePrompt, {"loop": true, "useTicks":true})
            .to({rotation: 90}, 15, createjs.Ease.backIn)
            .wait(30)
            .to({alpha: 0}, 6, createjs.Ease.none)
            .to({alpha: 1}, 1, createjs.Ease.none)
            .to({alpha: 0}, 6, createjs.Ease.none)
            .to({alpha: 1}, 1, createjs.Ease.none)
            .wait(30)
            .to({rotation: 0}, 1, createjs.Ease.none);

    } else if (state == "hidden") {
        createjs.Tween.removeTweens(this.rotatePrompt);
        this.rotatePrompt.visible = false;
    }
};

/**
 * Cleans up the component and removes it from parent if applicable
 */
RotatePromptSkin.prototype.destroy = function () {


    goog.base(this, "destroy");
};