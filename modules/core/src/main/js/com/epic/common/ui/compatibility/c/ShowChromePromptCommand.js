goog.provide('com.epic.common.ui.compatibility.c.ShowChromePromptCommand');

goog.require('com.epic.common.lang.Lang');
goog.require('com.epic.common.ui.compatibility.CompatibilityConstants');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ShowChromePromptCommand() {
}

goog.inherits(ShowChromePromptCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ShowChromePromptCommand.prototype.execute = function (note) {
    this.sendNotification(CompatibilityConstants.DO_SHOW_CHROME_PROMPT, {"message": Lang.getPhrase("chromePrompt")});

};