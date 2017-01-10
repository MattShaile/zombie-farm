goog.provide('com.epic.zfarm.player.c.PlayerShootCommand');

goog.require('com.epic.zfarm.navigation.m.NavigationConstants');
goog.require('com.epic.zfarm.navigation.m.NavigationProxy');
goog.require('com.epic.zfarm.player.m.PlayerProxy');
goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerShootCommand() {
}

goog.inherits(PlayerShootCommand, puremvc.SimpleCommand);

PlayerShootCommand.prototype.execute = function (note) {
    /**
     * @type {PlayerProxy}
     */
    var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);

    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    /**
     * @type {NavigationProxy}
     */
    var navigationProxy = this.facade.retrieveProxy(NavigationProxy.NAME);

    if (navigationProxy.getCurrentScreen() == NavigationConstants.ZOMBIE_SCREEN) {
        if (zombieProxy.getClosestZombie()) {
            if (!playerProxy.isShooting() && playerProxy.canShoot()) {
                this.facade.sendNotification(PlayerNoteBody.DO_SHOOT, new PlayerNoteBody());

                playerProxy.startShooting();
            }
        } else {
            if (playerProxy.isShooting()) {
                this.facade.sendNotification(PlayerNoteBody.DO_IDLE, new PlayerNoteBody());

                playerProxy.stopShooting();
            }
        }
    }
};