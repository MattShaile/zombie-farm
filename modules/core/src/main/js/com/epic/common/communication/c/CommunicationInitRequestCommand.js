goog.provide('com.epic.common.communication.c.CommunicationInitRequestCommand');

goog.require('com.epic.common.communication.CommunicationConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function CommunicationInitRequestCommand() {
}

goog.inherits(CommunicationInitRequestCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
CommunicationInitRequestCommand.prototype.execute = function (note) {
    this.facade.sendNotification(CommunicationConstants.DO_COMMUNICATION_INIT_REQUEST);
};