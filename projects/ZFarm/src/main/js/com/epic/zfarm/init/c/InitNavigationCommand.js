goog.provide('com.epic.zfarm.init.c.InitNavigationCommand');

goog.require('com.epic.zfarm.crops.v.manifest.CropManifest');
goog.require('com.epic.zfarm.navigation.m.NavigationProxy');
goog.require('com.epic.zfarm.navigation.v.component.NavigationButtonComponent');
goog.require('com.epic.zfarm.navigation.v.manifest.NavigationManifest');
goog.require('com.epic.zfarm.navigation.v.NavigationButtonMediator');
goog.require('com.epic.zfarm.navigation.v.skin.FarmButtonSkin');
goog.require('com.epic.zfarm.navigation.v.skin.GrannyButtonSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.ui.button.v.ButtonComponent');
goog.require('com.epic.common.ui.toggle.v.ToggleButtonComponent');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitNavigationCommand() {
}

goog.inherits(InitNavigationCommand, puremvc.SimpleCommand);

InitNavigationCommand.prototype.execute = function (note) {

    var root = StageSetup.rootContainer;

    // Granny button
    var grannyButtonSkin = new GrannyButtonSkin(AssetLib.getManifest(NavigationManifest.NAME));

    grannyButtonSkin.init();

    grannyButtonSkin.setProperty("x", 860);
    grannyButtonSkin.setProperty("y", 220);

    grannyButtonSkin.addToContainer(root);

    var grannyButtonComponent = new ButtonComponent(grannyButtonSkin);

    // Farm button
    var farmButtonSkin = new FarmButtonSkin(AssetLib.getManifest(NavigationManifest.NAME), AssetLib.getManifest(CropManifest.NAME));

    farmButtonSkin.init();

    farmButtonSkin.setProperty("x", 1060);
    farmButtonSkin.setProperty("y", 220);

    farmButtonSkin.addToContainer(root);

    var farmButtonComponent = new ButtonComponent(farmButtonSkin);

    // Toggle button
    var toggleButton = new ToggleButtonComponent(grannyButtonComponent, farmButtonComponent);

    // View component
    var navigationButtonComponent = new NavigationButtonComponent(toggleButton, root, grannyButtonSkin, farmButtonSkin);

    // Mediator
    var navigationButtonMediator = new NavigationButtonMediator(navigationButtonComponent);

    this.facade.registerMediator(navigationButtonMediator);

    this.facade.registerProxy(new NavigationProxy());
};