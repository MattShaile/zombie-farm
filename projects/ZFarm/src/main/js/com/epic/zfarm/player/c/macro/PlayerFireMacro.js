goog.provide('com.epic.zfarm.player.c.macro.PlayerFireMacro');

goog.require('com.epic.zfarm.player.c.PlayerFireCommand');
goog.require('com.epic.zfarm.player.c.PlayerShootCommand');


/**
 * @constructor
 */
function PlayerFireMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(PlayerFireMacro, puremvc.MacroCommand);

PlayerFireMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(PlayerFireCommand);
    this.addSubCommand(PlayerShootCommand);
};