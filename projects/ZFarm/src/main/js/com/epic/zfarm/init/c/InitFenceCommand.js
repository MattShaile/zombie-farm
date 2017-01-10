goog.provide('com.epic.zfarm.init.c.InitFenceCommand');

goog.require('com.epic.zfarm.fence.v.manifest.FenceManifest');
goog.require('com.epic.zfarm.fence.v.skin.FenceSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitFenceCommand() {
}

goog.inherits(InitFenceCommand, puremvc.SimpleCommand);

InitFenceCommand.prototype.execute = function (note) {
    var root = StageSetup.rootContainer;

    var fenceSkin = new FenceSkin(AssetLib.getManifest(FenceManifest.NAME));
    fenceSkin.init();
    fenceSkin.setProperty("x", StageSetup.canvas.width + 450);
    fenceSkin.setProperty("y", StageSetup.canvas.height);

    fenceSkin.addToContainer(root);
};