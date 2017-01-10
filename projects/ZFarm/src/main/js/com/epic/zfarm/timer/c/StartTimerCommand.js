goog.provide('com.epic.zfarm.timer.c.StartTimerCommand');

goog.require('com.epic.zfarm.timer.m.TimerProxy');
goog.require('com.epic.zfarm.timer.note.TimerNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function StartTimerCommand() {
}

goog.inherits(StartTimerCommand, puremvc.SimpleCommand);

StartTimerCommand.prototype.execute = function (note) {
    var timerProxy = this.facade.retrieveProxy(TimerProxy.NAME);

    timerProxy.startTimer(5000);

    this.facade.sendNotification(TimerNoteBody.DO_SHOW, new TimerNoteBody(0));
}