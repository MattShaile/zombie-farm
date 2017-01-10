goog.provide('com.epic.zfarm.init.c.InitCropsCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.v.component.CropCollectionComponent');
goog.require('com.epic.zfarm.crops.v.component.CropComponent');
goog.require('com.epic.zfarm.crops.v.CropCollectionMediator');
goog.require('com.epic.zfarm.crops.v.manifest.CropManifest');
goog.require('com.epic.zfarm.crops.v.skin.CropSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitCropsCommand() {
}

goog.inherits(InitCropsCommand, puremvc.SimpleCommand);

InitCropsCommand.prototype.execute = function (note) {
    this.registerProxies();
    this.registerMediators();
};

InitCropsCommand.prototype.registerMediators = function () {
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    var root = StageSetup.rootContainer;

    // Crop collection component
    var cropCollectionComponent = new CropCollectionComponent();

    // Crop skins and components
    var cropSkin;
    var cropComponent;
    var cropX;

    for (var i = 0; i < 5; i++) {
        cropSkin = new CropSkin(AssetLib.getManifest(CropManifest.NAME));
        cropSkin.init();

        cropX = 120 + 180 * i;
        cropSkin.setProperty("x", cropX);
        cropSkin.setProperty("y", 460);

        cropProxy.getCropByIndex(i).position = cropX;

        cropSkin.addToContainer(root);

        cropComponent = new CropComponent(cropSkin);

        cropCollectionComponent.addCropComponent(cropComponent);
    }

    // Crop collection mediator
    var cropCollectionMediator = new CropCollectionMediator(cropCollectionComponent);

    this.facade.registerMediator(cropCollectionMediator);
};

InitCropsCommand.prototype.registerProxies = function () {
    this.facade.registerProxy(new CropProxy());
};