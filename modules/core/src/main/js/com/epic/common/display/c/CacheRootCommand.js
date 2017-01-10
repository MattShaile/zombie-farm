goog.provide('com.epic.common.display.c.CacheRootCommand');

goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function CacheRootCommand() {
}

goog.inherits(CacheRootCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
CacheRootCommand.prototype.execute = function (note) {
    StageSetup.rootContainer.uncache();
    StageSetup.rootContainer.cache(0, 0, 800, 600);
};