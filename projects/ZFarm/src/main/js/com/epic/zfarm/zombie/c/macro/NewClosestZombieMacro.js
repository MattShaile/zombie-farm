goog.provide('com.epic.zfarm.zombie.c.macro.NewClosestZombieMacro');

goog.require('com.epic.zfarm.player.c.PlayerShootCommand');
goog.require('com.epic.zfarm.zombie.c.SetClosestZombieCommand');


/**
 * @constructor
 */
function NewClosestZombieMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(NewClosestZombieMacro, puremvc.MacroCommand);

NewClosestZombieMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(SetClosestZombieCommand);
    this.addSubCommand(PlayerShootCommand);
};