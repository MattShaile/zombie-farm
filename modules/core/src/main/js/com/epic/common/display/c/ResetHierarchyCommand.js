goog.provide('com.epic.common.display.c.ResetHierarchyCommand');

goog.require('com.epic.common.display.v.DepthManager');


/**
 * Resets the depth hierarchy
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function ResetHierarchyCommand() {
}

goog.inherits(ResetHierarchyCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
ResetHierarchyCommand.prototype.execute = function (note) {
    var depthManager = DepthManager.getInstance();

    depthManager.resetHierarchy();
};