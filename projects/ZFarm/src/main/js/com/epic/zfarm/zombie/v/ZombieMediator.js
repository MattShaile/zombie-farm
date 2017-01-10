goog.provide('com.epic.zfarm.zombie.v.ZombieMediator');

goog.require('com.epic.zfarm.zombie.note.ZombieComponentNoteBody');
goog.require('com.epic.zfarm.zombie.note.ZombieIDNoteBody');
goog.require('com.epic.zfarm.zombie.v.component.ZombieManagerComponent');
goog.require('com.epic.zfarm.zombie.v.event.ZombieEvent');


function ZombieMediator(component) {
    puremvc.Mediator.call(this, "ZombieMediator", component);

    this.getViewComponent().addEventListener(ZombieEvent.EVENT_FRONT_ZOMBIE_CHANGED, this);
    this.getViewComponent().addEventListener(ZombieEvent.EVENT_ZOMBIE_DIED, this);
}
goog.inherits(ZombieMediator, puremvc.Mediator);

/**
 * @param event {ZombieEvent}
 */
ZombieMediator.prototype.handleEvent = function (event) {
    switch (event.type) {
        case ZombieEvent.EVENT_FRONT_ZOMBIE_CHANGED:
            this.facade.sendNotification(ZombieIDNoteBody.WHEN_FRONT_ZOMBIE_CHANGED, new ZombieIDNoteBody(event.id));
            break;
        case ZombieEvent.EVENT_ZOMBIE_DIED:
            this.facade.sendNotification(ZombieIDNoteBody.WHEN_ZOMBIE_DEAD, new ZombieIDNoteBody(event.id));
            break;
    }
};

ZombieMediator.prototype.listNotificationInterests = function () {
    return [ZombieComponentNoteBody.DO_ADD_ZOMBIE, ZombieIDNoteBody.DO_HURT_ZOMBIE, ZombieIDNoteBody.DO_KILL_ZOMBIE];
};

ZombieMediator.prototype.handleNotification = function (note) {
    /**
     * @type {ZombieComponentNoteBody}
     */
    var zombieComponentNoteBody = note.getBody();

    /**
     * @type {ZombieIDNoteBody}
     */
    var zombieIDNoteBody = note.getBody();

    switch (note.getName()) {
        case ZombieComponentNoteBody.DO_ADD_ZOMBIE:
            this.getViewComponent().addZombie(zombieComponentNoteBody.getUniqueID(), zombieComponentNoteBody.getZombieComponent());
            break;
        case ZombieIDNoteBody.DO_HURT_ZOMBIE:
            this.getViewComponent().hurtZombie(zombieIDNoteBody.getUniqueID());
            break;
        case ZombieIDNoteBody.DO_KILL_ZOMBIE:
            this.getViewComponent().killZombie(zombieIDNoteBody.getUniqueID());
            break;
    }
};

/**
 * @returns {ZombieManagerComponent}
 */
ZombieMediator.prototype.getViewComponent = function () {
    return this.viewComponent;
};