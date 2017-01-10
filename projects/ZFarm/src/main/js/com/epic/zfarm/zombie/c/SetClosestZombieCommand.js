goog.provide('com.epic.zfarm.zombie.c.SetClosestZombieCommand');

goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');
goog.require('com.epic.zfarm.zombie.note.ZombieIDNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function SetClosestZombieCommand() {
}

goog.inherits(SetClosestZombieCommand, puremvc.SimpleCommand);

SetClosestZombieCommand.prototype.execute = function (note) {
    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    /**
     * @type {ZombieIDNoteBody}
     */
    var zombieIDNote = note.getBody();

    zombieProxy.setClosestZombie(zombieIDNote.getUniqueID());
};