goog.provide('com.epic.common.display.c.UncacheRootCommand');

goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function UncacheRootCommand() {
}

goog.inherits(UncacheRootCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
UncacheRootCommand.prototype.execute = function (note) {
    StageSetup.rootContainer.uncache();
};