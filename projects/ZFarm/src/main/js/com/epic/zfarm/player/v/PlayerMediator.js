goog.provide('com.epic.zfarm.player.v.PlayerMediator');

goog.require('com.epic.zfarm.player.note.PlayerActionNoteBody');
goog.require('com.epic.zfarm.player.note.PlayerMoveNoteBody');
goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.zfarm.player.note.PlayerShootingNoteBody');
goog.require('com.epic.zfarm.player.v.component.PlayerComponent');


function PlayerMediator(component) {
    puremvc.Mediator.call(this, "PlayerMediator", component);

    component.addEventListener(PlayerComponent.EVENT_TARGET_REACHED, this);
}
goog.inherits(PlayerMediator, puremvc.Mediator);

PlayerMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case PlayerComponent.EVENT_TARGET_REACHED:
            this.facade.sendNotification(PlayerNoteBody.WHEN_TARGET_REACHED, new PlayerNoteBody());
            break;
    }
};

PlayerMediator.prototype.listNotificationInterests = function () {
    return [PlayerMoveNoteBody.DO_PLAYER_MOVE, PlayerMoveNoteBody.DO_PLAYER_SNAP_TO, PlayerMoveNoteBody.DO_PLAYER_SCREEN_SNAP, PlayerActionNoteBody.DO_ACTION, PlayerNoteBody.DO_IDLE, PlayerNoteBody.DO_SHOOT, PlayerShootingNoteBody.DO_SET_SHOOTING, PlayerNoteBody.DO_FIRE];
};

PlayerMediator.prototype.handleNotification = function (note) {
    switch (note.getName()) {
        case PlayerMoveNoteBody.DO_PLAYER_MOVE:
            this.getViewComponent().move(note.getBody().getX());
            break;
        case PlayerMoveNoteBody.DO_PLAYER_SNAP_TO:
            this.getViewComponent().snapTo(note.getBody().getX());
            break;
        case PlayerMoveNoteBody.DO_PLAYER_SCREEN_SNAP:
            this.getViewComponent().screenSnap(note.getBody().getX());
            break;
        case PlayerActionNoteBody.DO_ACTION:
            this.getViewComponent().action(note.getBody().getAction());
            break;
        case PlayerNoteBody.DO_IDLE:
            this.getViewComponent().idle();
            break;
        case PlayerNoteBody.DO_SHOOT:
            this.getViewComponent().shoot();
            break;
        case PlayerNoteBody.DO_FIRE:
            this.getViewComponent().fire();
            break;
        case PlayerShootingNoteBody.DO_SET_SHOOTING:
            this.getViewComponent().setShooting(note.getBody().getShooting());
            break;
    }
};

/**
 * @returns {PlayerComponent}
 */
PlayerMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};