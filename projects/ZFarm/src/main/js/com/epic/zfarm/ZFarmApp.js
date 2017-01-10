goog.provide('com.epic.zfarm.ZFarmApp');

goog.require('com.epic.zfarm.crops.v.manifest.CropManifest');
goog.require('com.epic.zfarm.fence.v.manifest.FenceManifest');
goog.require('com.epic.zfarm.general.v.manifest.GeneralManifest');
goog.require('com.epic.zfarm.init.c.macro.PreloadCompleteMacro');
goog.require('com.epic.zfarm.inventory.v.manifest.InventoryManifest');
goog.require('com.epic.zfarm.menu.v.manifest.MenuManifest');
goog.require('com.epic.zfarm.navigation.v.manifest.NavigationManifest');
goog.require('com.epic.zfarm.player.v.manifest.GunManifest');
goog.require('com.epic.zfarm.player.v.manifest.PlayerManifest');
goog.require('com.epic.zfarm.scenery.v.manifest.SceneryManifest');
goog.require('com.epic.zfarm.zombie.v.manifest.ZombieManifest');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.preloader.c.StartPreloadCommand');
goog.require('com.epic.common.preloader.m.PreloaderProxy');
goog.require('com.epic.common.preloader.PreloaderConstants');
goog.require('com.epic.common.preloader.v.PreloaderMediator');
goog.require('com.epic.common.preloader.v.ProgressBarComponent');
goog.require('com.epic.common.preloader.v.skins.PercentageTextSkin');
goog.require('com.epic.common.screen.v.ScreenComponent');
goog.require('com.epic.common.screen.v.ScreenMediator');
goog.require('com.epic.common.screen.v.skins.RotatePromptSkin');
goog.require('com.epic.common.util.StageSetup');


/**
 * Entry point for the puremvc app
 *
 * registers the preload and startup commands and then dispatches a preload
 * notification to begin
 *
 * @constructor
 */



function ZFarmApp() {
    StageSetup.init();

    AssetLib.addManifest(GeneralManifest.NAME, new GeneralManifest());
    AssetLib.addManifest(PlayerManifest.NAME, new PlayerManifest());
    AssetLib.addManifest(GunManifest.NAME, new GunManifest());
    AssetLib.addManifest(SceneryManifest.NAME, new SceneryManifest());
    AssetLib.addManifest(CropManifest.NAME, new CropManifest());
    AssetLib.addManifest(InventoryManifest.NAME, new InventoryManifest());
    AssetLib.addManifest(NavigationManifest.NAME, new NavigationManifest());
    AssetLib.addManifest(ZombieManifest.NAME, new ZombieManifest());
    AssetLib.addManifest(FenceManifest.NAME, new FenceManifest());
    AssetLib.addManifest(MenuManifest.NAME, new MenuManifest());

    var root = StageSetup.rootContainer;
    var overlay = StageSetup.overlayContainer;
    var portrait = StageSetup.portraitContainer;

    // Start PureMVC core
    this.facade = puremvc.Facade.getInstance(ZFarmApp.CORE_NAME);

    // Register commands
    this.facade.registerCommand(PreloaderConstants.DO_START_PRELOADER, StartPreloadCommand);
    this.facade.registerCommand(PreloaderConstants.WHEN_PRELOADER_COMPLETE, PreloadCompleteMacro);

    // Register proxies
    this.facade.registerProxy(new PreloaderProxy());

    // Register mediators
    var progressBarSkin = new PercentageTextSkin(null);
    progressBarSkin.getContainer().x = 480;
    progressBarSkin.getContainer().y = 270;
    progressBarSkin.addToContainer(overlay);

    var progressComponent = new ProgressBarComponent(progressBarSkin);

    var preloaderMediator = new PreloaderMediator(progressComponent);

    this.facade.registerMediator(preloaderMediator);

    var rotatePrompt = new RotatePromptSkin(AssetLib.getManifest(GeneralManifest.NAME));
    rotatePrompt.addToContainer(portrait);

    var screenComponent = new ScreenComponent(rotatePrompt, 960, 540, true);
    var screenMediator = new ScreenMediator(screenComponent);
    this.facade.registerMediator(screenMediator);

    this.startPreload();
}

/**
 * Sends off the notification to start the preloader
 */
ZFarmApp.prototype.startPreload = function () {
    this.facade.sendNotification(PreloaderConstants.DO_START_PRELOADER, {"manifests": AssetLib.getAllManifests()});
};

/**
 * @const
 * @type {string}
 */
ZFarmApp.CORE_NAME = "ZFarmApp";