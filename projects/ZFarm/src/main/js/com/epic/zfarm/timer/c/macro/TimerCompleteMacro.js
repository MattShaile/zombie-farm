goog.provide('com.epic.zfarm.timer.c.macro.TimerCompleteMacro');

goog.require('com.epic.zfarm.crops.c.CropActionCompleteCommand');
goog.require('com.epic.zfarm.crops.c.UpdateSelectedCropCommand');
goog.require('com.epic.zfarm.timer.c.StopTimerCommand');


/**
 * @constructor
 */
function TimerCompleteMacro() {
    puremvc.MacroCommand.call(this);
}

goog.inherits(TimerCompleteMacro, puremvc.MacroCommand);

TimerCompleteMacro.prototype.initializeMacroCommand = function () {
    this.addSubCommand(CropActionCompleteCommand);
    this.addSubCommand(UpdateSelectedCropCommand);
    this.addSubCommand(StopTimerCommand);
};