goog.provide('com.epic.zfarm.timer.c.StopTimerCommand');

goog.require('com.epic.zfarm.timer.m.TimerProxy');
goog.require('com.epic.zfarm.timer.note.TimerNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function StopTimerCommand() {
}

goog.inherits(StopTimerCommand, puremvc.SimpleCommand);

StopTimerCommand.prototype.execute = function (note) {
    var timerProxy = this.facade.retrieveProxy(TimerProxy.NAME);

    timerProxy.stopTimer();

    this.facade.sendNotification(TimerNoteBody.DO_HIDE, new TimerNoteBody(0));
}