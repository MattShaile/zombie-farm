goog.provide('com.epic.zfarm.zombie.c.macro.AddZombieMacro');

goog.require('com.epic.zfarm.player.c.PlayerShootCommand');
goog.require('com.epic.zfarm.zombie.c.AddZombieCommand');


/**
 * @constructor
 */
function AddZombieMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(AddZombieMacro, puremvc.MacroCommand);

AddZombieMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(AddZombieCommand);
    this.addSubCommand(PlayerShootCommand);
};