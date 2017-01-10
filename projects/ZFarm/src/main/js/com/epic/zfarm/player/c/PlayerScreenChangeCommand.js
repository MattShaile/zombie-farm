goog.provide('com.epic.zfarm.player.c.PlayerScreenChangeCommand');

goog.require('com.epic.zfarm.navigation.m.NavigationConstants');
goog.require('com.epic.zfarm.navigation.m.NavigationProxy');
goog.require('com.epic.zfarm.player.m.PlayerProxy');
goog.require('com.epic.zfarm.player.note.PlayerMoveNoteBody');
goog.require('com.epic.zfarm.player.note.PlayerShootingNoteBody');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PlayerScreenChangeCommand() {
}

goog.inherits(PlayerScreenChangeCommand, puremvc.SimpleCommand);

PlayerScreenChangeCommand.prototype.execute = function (note) {
    /**
     * @type {NavigationProxy}
     */
    var navigationProxy = this.facade.retrieveProxy(NavigationProxy.NAME);

    /**
     * @type {PlayerProxy}
     */
    var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);

    playerProxy.setReadyToShoot(false);

    if (note.getBody().getToggled()) {
        navigationProxy.setCurrentScreen(NavigationConstants.ZOMBIE_SCREEN);

        this.facade.sendNotification(PlayerShootingNoteBody.DO_SET_SHOOTING, new PlayerShootingNoteBody(true));

        this.facade.sendNotification(PlayerMoveNoteBody.DO_PLAYER_SCREEN_SNAP, new PlayerMoveNoteBody(StageSetup.canvas.width));
        this.facade.sendNotification(PlayerMoveNoteBody.DO_PLAYER_MOVE, new PlayerMoveNoteBody(StageSetup.canvas.width + 150));
    } else {
        navigationProxy.setCurrentScreen(NavigationConstants.FARM_SCREEN);

        playerProxy.stopShooting();

        this.facade.sendNotification(PlayerShootingNoteBody.DO_SET_SHOOTING, new PlayerShootingNoteBody(false));

        this.facade.sendNotification(PlayerMoveNoteBody.DO_PLAYER_SCREEN_SNAP, new PlayerMoveNoteBody(StageSetup.canvas.width));
        this.facade.sendNotification(PlayerMoveNoteBody.DO_PLAYER_MOVE, new PlayerMoveNoteBody(StageSetup.canvas.width / 2));
    }
};