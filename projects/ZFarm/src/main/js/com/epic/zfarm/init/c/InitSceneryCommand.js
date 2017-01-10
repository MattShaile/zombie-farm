goog.provide('com.epic.zfarm.init.c.InitSceneryCommand');

goog.require('com.epic.zfarm.scenery.v.manifest.SceneryManifest');
goog.require('com.epic.zfarm.scenery.v.skin.ScenerySkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitSceneryCommand() {
}

goog.inherits(InitSceneryCommand, puremvc.SimpleCommand);

InitSceneryCommand.prototype.execute = function (note) {
    var root = StageSetup.rootContainer;

    var scenerySkin = new ScenerySkin(AssetLib.getManifest(SceneryManifest.NAME));
    scenerySkin.init();

    scenerySkin.addToContainer(root);
};