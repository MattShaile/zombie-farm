goog.provide('com.epic.zfarm.player.c.PlayerFireCommand');

goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.zfarm.zombie.m.vo.ZombieVO');
goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');
goog.require('com.epic.zfarm.zombie.note.ZombieIDNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerFireCommand() {
}

goog.inherits(PlayerFireCommand, puremvc.SimpleCommand);

PlayerFireCommand.prototype.execute = function (note) {
    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    /**
     * @type {ZombieVO}
     */
    var zombieVO = zombieProxy.getClosestZombie();

    if (zombieVO) {
        zombieVO.hp--;
        var zombieID = zombieVO.id;

        if (zombieVO.hp <= 0) {
            zombieProxy.clearClosestZombie();

            this.facade.sendNotification(ZombieIDNoteBody.DO_KILL_ZOMBIE, new ZombieIDNoteBody(zombieID));
        } else {
            this.facade.sendNotification(ZombieIDNoteBody.DO_HURT_ZOMBIE, new ZombieIDNoteBody(zombieID));
        }

        this.facade.sendNotification(PlayerNoteBody.DO_FIRE, new PlayerNoteBody());

    }
};