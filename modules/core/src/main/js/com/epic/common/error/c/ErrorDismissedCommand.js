goog.provide('com.epic.common.error.c.ErrorDismissedCommand');

goog.require('com.epic.common.error.ErrorConstants');
goog.require('com.epic.common.error.m.ErrorProxy');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ErrorDismissedCommand() {
}

goog.inherits(ErrorDismissedCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ErrorDismissedCommand.prototype.execute = function (note) {
    var errorProxy = this.facade.retrieveProxy(ErrorProxy.NAME);
    var noteName = errorProxy.getDismissNoteName();
    var noteBody = errorProxy.getDismissNoteBody();

    if (noteName == null) {
        noteName = ErrorConstants.WHEN_GENERAL_ERROR_DISMISSED;
        noteBody = {};
    }

    errorProxy.setDismissNote(null);

    this.sendNotification(ErrorConstants.DO_HIDE_ERROR_PROMPT, {});

    this.facade.sendNotification(noteName, noteBody);
};