goog.provide('com.epic.common.communication.c.CommunicationPlayRequestCommand');

goog.require('com.epic.common.communication.CommunicationConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function CommunicationPlayRequestCommand() {
}

goog.inherits(CommunicationPlayRequestCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
CommunicationPlayRequestCommand.prototype.execute = function (note) {
    this.facade.sendNotification(CommunicationConstants.DO_COMMUNICATION_PLAY_REQUEST);
};