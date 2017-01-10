goog.provide('com.epic.common.error.c.HideErrorPromptCommand');

goog.require('com.epic.common.error.ErrorConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideErrorPromptCommand() {
}

goog.inherits(HideErrorPromptCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
HideErrorPromptCommand.prototype.execute = function (note) {
    this.sendNotification(ErrorConstants.DO_HIDE_ERROR_PROMPT, {});
};