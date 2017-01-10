goog.provide('com.epic.zfarm.init.c.InitMenuCommand');

goog.require('com.epic.zfarm.menu.v.component.MenuComponent');
goog.require('com.epic.zfarm.menu.v.manifest.MenuManifest');
goog.require('com.epic.zfarm.menu.v.MenuMediator');
goog.require('com.epic.zfarm.menu.v.skin.MenuButtonSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.ui.button.v.ButtonComponent');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitMenuCommand() {
}

goog.inherits(InitMenuCommand, puremvc.SimpleCommand);

InitMenuCommand.prototype.execute = function (note) {
    // Get containers
    var overlay = StageSetup.overlayContainer;

    var menuManifest = AssetLib.getManifest(MenuManifest.NAME);

    /**
     * @type {MenuButtonSkin}
     */
    var startButtonSkin = new MenuButtonSkin(menuManifest);
    startButtonSkin.init();

    startButtonSkin.setProperty("x", StageSetup.canvas.width / 2);
    startButtonSkin.setProperty("y", StageSetup.canvas.height / 2);

    startButtonSkin.addToContainer(overlay);

    /**
     * @type {ButtonComponent}
     */
    var startButton = new ButtonComponent(startButtonSkin);
    startButton.setLabel("PLAY");

    var menuComponent = new MenuComponent(startButton);

    var menuMediator = new MenuMediator(menuComponent);

    this.facade.registerMediator(menuMediator);
};