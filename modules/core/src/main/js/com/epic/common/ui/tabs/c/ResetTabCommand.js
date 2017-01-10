goog.provide('com.epic.common.ui.tabs.c.ResetTabCommand');

goog.require('com.epic.common.ui.tabs.TabConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ResetTabCommand() {
}

goog.inherits(ResetTabCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ResetTabCommand.prototype.execute = function (note) {
    this.facade.sendNotification(TabConstants.DO_RESET_TAB, {});
};