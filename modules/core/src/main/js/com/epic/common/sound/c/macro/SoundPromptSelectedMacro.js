goog.provide('com.epic.common.sound.c.macro.SoundPromptSelectedMacro');

goog.require('com.epic.common.sound.c.HideSoundConfirmCommand');
goog.require('com.epic.common.sound.c.MuteChangedCommand');


/**
 * @extends {puremvc.MacroCommand}
 * @constructor
 */
function SoundPromptSelectedMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(SoundPromptSelectedMacro, puremvc.MacroCommand);


SoundPromptSelectedMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(MuteChangedCommand);
    this.addSubCommand(HideSoundConfirmCommand);
};