goog.provide('com.epic.zfarm.init.c.InitPlayerCommand');

goog.require('com.epic.zfarm.player.m.PlayerProxy');
goog.require('com.epic.zfarm.player.v.component.PlayerComponent');
goog.require('com.epic.zfarm.player.v.manifest.PlayerManifest');
goog.require('com.epic.zfarm.player.v.PlayerMediator');
goog.require('com.epic.zfarm.player.v.skin.PlayerSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitPlayerCommand() {
}

goog.inherits(InitPlayerCommand, puremvc.SimpleCommand);

InitPlayerCommand.prototype.execute = function (note) {
    this.registerProxies();

    this.registerMediators();
};


InitPlayerCommand.prototype.registerMediators = function () {
    // Get containers
    var root = StageSetup.rootContainer;

    // Create player skin
    var playerSkin = new PlayerSkin(AssetLib.getManifest(PlayerManifest.NAME));

    playerSkin.init();
    playerSkin.setProperty("x", -1000);
    playerSkin.setProperty("y", 450);

    playerSkin.addToContainer(root);

    // Create player component
    var playerComponent = new PlayerComponent(playerSkin);

    // Create player mediator
    var playerMediator = new PlayerMediator(playerComponent);

    this.facade.registerMediator(playerMediator);
};


InitPlayerCommand.prototype.registerProxies = function () {
    this.facade.registerProxy(new PlayerProxy());
};