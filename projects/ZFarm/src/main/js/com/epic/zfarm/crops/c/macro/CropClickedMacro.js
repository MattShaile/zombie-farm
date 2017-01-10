goog.provide('com.epic.zfarm.crops.c.macro.CropClickedMacro');

goog.require('com.epic.zfarm.crops.c.CropClickedCommand');
goog.require('com.epic.zfarm.timer.c.StopTimerCommand');


/**
 * @constructor
 */
function CropClickedMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(CropClickedMacro, puremvc.MacroCommand);

CropClickedMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(StopTimerCommand);
    this.addSubCommand(CropClickedCommand);
};