goog.provide('com.epic.zfarm.init.c.macro.SetupGameMacro');

goog.require('com.epic.zfarm.destroy.c.DestroyMenuCommand');
goog.require('com.epic.zfarm.init.c.InitCropsCommand');
goog.require('com.epic.zfarm.init.c.InitFenceCommand');
goog.require('com.epic.zfarm.init.c.InitInventoryCommand');
goog.require('com.epic.zfarm.init.c.InitNavigationCommand');
goog.require('com.epic.zfarm.init.c.InitPlayerCommand');
goog.require('com.epic.zfarm.init.c.InitSceneryCommand');
goog.require('com.epic.zfarm.init.c.InitTimerCommand');
goog.require('com.epic.zfarm.init.c.InitZombiesCommand');
goog.require('com.epic.zfarm.player.c.PlayerEnterCommand');
goog.require('com.epic.zfarm.zombie.c.StartZombieSpawningCommand');
goog.require('com.epic.common.screen.c.SwitchScreenBackgroundToDefault');


/**
 * @constructor
 */
function SetupGameMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(SetupGameMacro, puremvc.MacroCommand);

/**
 * MacroCommand Initialize function
 */
SetupGameMacro.prototype.initializeMacroCommand = function () {

    this.addSubCommand(DestroyMenuCommand);

    this.addSubCommand(SwitchScreenBackgroundToDefault);

    this.addSubCommand(InitSceneryCommand);

    this.addSubCommand(InitZombiesCommand);

    this.addSubCommand(InitFenceCommand);

    this.addSubCommand(InitPlayerCommand);

    this.addSubCommand(InitCropsCommand);

    this.addSubCommand(InitNavigationCommand);

    this.addSubCommand(InitTimerCommand);

    this.addSubCommand(InitInventoryCommand);

    this.addSubCommand(PlayerEnterCommand);

    this.addSubCommand(StartZombieSpawningCommand);
};