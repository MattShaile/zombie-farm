goog.provide('com.epic.zfarm.init.c.macro.PreloadCompleteMacro');

goog.require('com.epic.zfarm.init.c.InitCommandsCommand');
goog.require('com.epic.zfarm.init.c.InitMenuCommand');
goog.require('com.epic.common.preloader.c.PreloadCompleteCommand');
goog.require('com.epic.common.screen.c.InitializeScreenCommand');
goog.require('com.epic.common.screen.c.ScreenGameModeCommand');


/**
 * @constructor
 */
function PreloadCompleteMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(PreloadCompleteMacro, puremvc.MacroCommand);

/**
 * MacroCommand Initialize function
 */
PreloadCompleteMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(ScreenGameModeCommand);

    this.addSubCommand(InitializeScreenCommand);

    this.addSubCommand(PreloadCompleteCommand);

    this.addSubCommand(InitCommandsCommand);

    this.addSubCommand(InitMenuCommand);
};