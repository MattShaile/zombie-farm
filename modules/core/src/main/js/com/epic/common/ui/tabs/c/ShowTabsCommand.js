goog.provide('com.epic.common.ui.tabs.c.ShowTabsCommand');

goog.require('com.epic.common.ui.tabs.TabConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowTabsCommand() {
}

goog.inherits(ShowTabsCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ShowTabsCommand.prototype.execute = function (note) {
    this.facade.sendNotification(TabConstants.DO_SHOW_TABS, {});
};