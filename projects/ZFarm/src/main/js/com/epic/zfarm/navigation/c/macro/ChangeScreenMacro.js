goog.provide('com.epic.zfarm.navigation.c.macro.ChangeScreenMacro');

goog.require('com.epic.zfarm.inventory.c.ShowInventoryCommand');
goog.require('com.epic.zfarm.navigation.c.EnableNavigationCommand');
goog.require('com.epic.zfarm.player.c.PlayerScreenChangeCommand');


/**
 * @constructor
 */
function ChangeScreenMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(ChangeScreenMacro, puremvc.MacroCommand);

ChangeScreenMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(EnableNavigationCommand);
    this.addSubCommand(PlayerScreenChangeCommand);
    this.addSubCommand(ShowInventoryCommand);
};