goog.provide('com.epic.common.account.c.UpdateBalanceFieldsCommand');

goog.require('com.epic.common.account.AccountConstants');
goog.require('com.epic.common.account.m.AccountProxy');


/**
 * Sends a stake field update notification
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function UpdateBalanceFieldsCommand() {
}

goog.inherits(UpdateBalanceFieldsCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
UpdateBalanceFieldsCommand.prototype.execute = function (note) {
    var accountProxy = this.facade.retrieveProxy(AccountProxy.NAME);

    this.facade.sendNotification(AccountConstants.DO_UPDATE_BALANCE_FIELDS, {"balance": Math.max(0, accountProxy.getBalance())});
};