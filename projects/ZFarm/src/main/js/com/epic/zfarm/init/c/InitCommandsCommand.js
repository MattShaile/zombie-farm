goog.provide('com.epic.zfarm.init.c.InitCommandsCommand');

goog.require('com.epic.zfarm.crops.c.DoCropActionCommand');
goog.require('com.epic.zfarm.crops.c.macro.CropClickedMacro');
goog.require('com.epic.zfarm.crops.c.UpdateCropByIndexCommand');
goog.require('com.epic.zfarm.crops.note.CropActionNoteBody');
goog.require('com.epic.zfarm.crops.note.CropNoteBody');
goog.require('com.epic.zfarm.init.c.macro.SetupGameMacro');
goog.require('com.epic.zfarm.inventory.c.SelectInventoryItemCommand');
goog.require('com.epic.zfarm.inventory.note.InventoryNoteBody');
goog.require('com.epic.zfarm.menu.note.MenuNoteBody');
goog.require('com.epic.zfarm.navigation.c.macro.ChangeScreenMacro');
goog.require('com.epic.zfarm.navigation.c.macro.StartNavigationMacro');
goog.require('com.epic.zfarm.navigation.note.NavigationNoteBody');
goog.require('com.epic.zfarm.player.c.macro.PlayerFireMacro');
goog.require('com.epic.zfarm.player.c.macro.PlayerTargetReachedMacro');
goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.zfarm.timer.c.macro.TimerCompleteMacro');
goog.require('com.epic.zfarm.timer.note.TimerNoteBody');
goog.require('com.epic.zfarm.zombie.c.macro.AddZombieMacro');
goog.require('com.epic.zfarm.zombie.c.macro.NewClosestZombieMacro');
goog.require('com.epic.zfarm.zombie.c.RemoveZombieCommand');
goog.require('com.epic.zfarm.zombie.note.ZombieIDNoteBody');
goog.require('com.epic.zfarm.zombie.note.ZombieNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitCommandsCommand() {
}

goog.inherits(InitCommandsCommand, puremvc.SimpleCommand);

InitCommandsCommand.prototype.execute = function (note) {
    this.initMenuCommands();
    this.initGameCommands();
};

InitCommandsCommand.prototype.initMenuCommands = function () {
    this.facade.registerCommand(MenuNoteBody.WHEN_PLAY_CLICKED, SetupGameMacro);
};

InitCommandsCommand.prototype.initGameCommands = function () {
    // Crops
    this.facade.registerCommand(CropNoteBody.WHEN_CROP_CLICKED, CropClickedMacro);
    this.facade.registerCommand(CropNoteBody.WHEN_CROP_UPDATED, UpdateCropByIndexCommand);

    // Man
    this.facade.registerCommand(PlayerNoteBody.WHEN_TARGET_REACHED, PlayerTargetReachedMacro);

    // Shooting
    this.facade.registerCommand(PlayerNoteBody.WHEN_FIRE_READY, PlayerFireMacro);

    // Timers
    this.facade.registerCommand(TimerNoteBody.WHEN_COMPLETE, TimerCompleteMacro);

    // Navigation
    this.facade.registerCommand(NavigationNoteBody.WHEN_SCROLL_STARTED, StartNavigationMacro);
    this.facade.registerCommand(NavigationNoteBody.WHEN_SCROLL_COMPLETE, ChangeScreenMacro);

    this.facade.registerCommand(InventoryNoteBody.WHEN_ITEM_CLICKED, SelectInventoryItemCommand);

    this.facade.registerCommand(CropActionNoteBody.WHEN_CROP_ACTION, DoCropActionCommand);

    // Zombies
    this.facade.registerCommand(ZombieNoteBody.WHEN_ADD_ZOMBIE, AddZombieMacro);
    this.facade.registerCommand(ZombieIDNoteBody.WHEN_FRONT_ZOMBIE_CHANGED, NewClosestZombieMacro);
    this.facade.registerCommand(ZombieIDNoteBody.WHEN_ZOMBIE_DEAD, RemoveZombieCommand);
};