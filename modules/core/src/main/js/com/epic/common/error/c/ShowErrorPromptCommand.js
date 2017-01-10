goog.provide('com.epic.common.error.c.ShowErrorPromptCommand');




/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowErrorPromptCommand() {
}

goog.inherits(ShowErrorPromptCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ShowErrorPromptCommand.prototype.execute = function (note) {
    this.sendNotification(ShowErrorPromptCommand.DO_SHOW_ERROR_PROMPT, {"message": note.getBody().message});
};