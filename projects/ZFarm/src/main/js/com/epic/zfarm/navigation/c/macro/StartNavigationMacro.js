goog.provide('com.epic.zfarm.navigation.c.macro.StartNavigationMacro');

goog.require('com.epic.zfarm.crops.c.DeselectCropCommand');
goog.require('com.epic.zfarm.inventory.c.HideInventoryCommand');
goog.require('com.epic.zfarm.navigation.c.DisableNavigationCommand');
goog.require('com.epic.zfarm.player.c.PlayerIdleCommand');
goog.require('com.epic.zfarm.timer.c.StopTimerCommand');


/**
 * @constructor
 */
function StartNavigationMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(StartNavigationMacro, puremvc.MacroCommand);

StartNavigationMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(DisableNavigationCommand);
    this.addSubCommand(StopTimerCommand);
    this.addSubCommand(PlayerIdleCommand);
    this.addSubCommand(DeselectCropCommand);
    this.addSubCommand(HideInventoryCommand);
};