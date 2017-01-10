goog.provide('com.epic.zfarm.init.c.InitTimerCommand');

goog.require('com.epic.zfarm.general.v.manifest.GeneralManifest');
goog.require('com.epic.zfarm.timer.m.TimerProxy');
goog.require('com.epic.zfarm.timer.v.component.TimerComponent');
goog.require('com.epic.zfarm.timer.v.skin.TimerSkin');
goog.require('com.epic.zfarm.timer.v.TimerMediator');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitTimerCommand() {
}

goog.inherits(InitTimerCommand, puremvc.SimpleCommand);

InitTimerCommand.prototype.execute = function (note) {
    this.registerMediators();

    this.registerProxies();
};

InitTimerCommand.prototype.registerMediators = function () {
    var root = StageSetup.rootContainer;

    var timerSkin = new TimerSkin(AssetLib.getManifest(GeneralManifest.NAME));
    timerSkin.init();

    timerSkin.setProperty("y", 300);
    timerSkin.setProperty(TimerSkin.PROPERTY_PERCENT, 0);
    timerSkin.setProperty(TimerSkin.PROPERTY_VISIBLE, 0);

    timerSkin.addToContainer(root);

    var timerComponent = new TimerComponent(timerSkin);

    var timerMediator = new TimerMediator(timerComponent);

    this.facade.registerMediator(timerMediator);
};

InitTimerCommand.prototype.registerProxies = function () {
    this.facade.registerProxy(new TimerProxy());
};