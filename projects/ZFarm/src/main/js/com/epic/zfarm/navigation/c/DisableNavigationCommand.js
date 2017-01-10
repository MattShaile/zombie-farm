goog.provide('com.epic.zfarm.navigation.c.DisableNavigationCommand');

goog.require('com.epic.zfarm.navigation.note.NavigationEnabledNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function DisableNavigationCommand() {
}

goog.inherits(DisableNavigationCommand, puremvc.SimpleCommand);

DisableNavigationCommand.prototype.execute = function (note) {
    this.facade.sendNotification(NavigationEnabledNoteBody.DO_SET_NAVIGATION_ENABLED, new NavigationEnabledNoteBody(false));
};