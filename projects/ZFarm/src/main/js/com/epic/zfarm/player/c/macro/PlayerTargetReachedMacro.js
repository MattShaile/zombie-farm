goog.provide('com.epic.zfarm.player.c.macro.PlayerTargetReachedMacro');

goog.require('com.epic.zfarm.player.c.PlayerActionCommand');
goog.require('com.epic.zfarm.player.c.PlayerShootCommand');


/**
 * @constructor
 */
function PlayerTargetReachedMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(PlayerTargetReachedMacro, puremvc.MacroCommand);

PlayerTargetReachedMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(PlayerActionCommand);
    this.addSubCommand(PlayerShootCommand);
};