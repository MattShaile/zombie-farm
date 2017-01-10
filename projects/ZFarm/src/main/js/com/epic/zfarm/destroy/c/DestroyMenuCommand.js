goog.provide('com.epic.zfarm.destroy.c.DestroyMenuCommand');

goog.require('com.epic.zfarm.menu.v.MenuMediator');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function DestroyMenuCommand() {
}

goog.inherits(DestroyMenuCommand, puremvc.SimpleCommand);

DestroyMenuCommand.prototype.execute = function (note) {
    this.facade.removeMediator(MenuMediator.NAME);
};