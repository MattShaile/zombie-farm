goog.provide('com.epic.zfarm.zombie.c.RemoveZombieCommand');

goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');
goog.require('com.epic.zfarm.zombie.note.ZombieIDNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function RemoveZombieCommand() {
}

goog.inherits(RemoveZombieCommand, puremvc.SimpleCommand);

RemoveZombieCommand.prototype.execute = function (note) {
    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    /**
     * @type {ZombieIDNoteBody}
     */
    var zombieIDNote = note.getBody();

    zombieProxy.removeZombie(zombieIDNote.getUniqueID());
};