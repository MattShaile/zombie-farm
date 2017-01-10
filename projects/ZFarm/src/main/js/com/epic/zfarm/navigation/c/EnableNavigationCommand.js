goog.provide('com.epic.zfarm.navigation.c.EnableNavigationCommand');

goog.require('com.epic.zfarm.navigation.note.NavigationEnabledNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function EnableNavigationCommand() {
}

goog.inherits(EnableNavigationCommand, puremvc.SimpleCommand);

EnableNavigationCommand.prototype.execute = function (note) {
    this.facade.sendNotification(NavigationEnabledNoteBody.DO_SET_NAVIGATION_ENABLED, new NavigationEnabledNoteBody(true));
};