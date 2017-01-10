goog.provide('com.epic.common.ui.tabs.c.HideTabsCommand');

goog.require('com.epic.common.ui.tabs.TabConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideTabsCommand() {
}

goog.inherits(HideTabsCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
HideTabsCommand.prototype.execute = function (note) {
    this.facade.sendNotification(TabConstants.DO_HIDE_TABS, {});
};