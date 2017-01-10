goog.provide('com.epic.common.ui.compatibility.c.HideChromePromptCommand');

goog.require('com.epic.common.ui.compatibility.CompatibilityConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function HideChromePromptCommand() {
}

goog.inherits(HideChromePromptCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
HideChromePromptCommand.prototype.execute = function (note) {
    this.sendNotification(CompatibilityConstants.DO_HIDE_CHROME_PROMPT, {});
};