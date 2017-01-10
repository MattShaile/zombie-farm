goog.provide('com.epic.zfarm.zombie.c.AddZombieCommand');

goog.require('com.epic.zfarm.zombie.m.vo.ZombieConfigVO');
goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');
goog.require('com.epic.zfarm.zombie.note.ZombieComponentNoteBody');
goog.require('com.epic.zfarm.zombie.v.component.ZombieComponent');
goog.require('com.epic.zfarm.zombie.v.manifest.ZombieManifest');
goog.require('com.epic.zfarm.zombie.v.skin.ZombieSkin');
goog.require('com.epic.common.core.m.AssetLib');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function AddZombieCommand() {
}

goog.inherits(AddZombieCommand, puremvc.SimpleCommand);

AddZombieCommand.prototype.execute = function (note) {
    /**
     * @type {ZombiesProxy}
     */
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);

    var yPos = Math.random() * 100;

    // Create player skin
    var zombieSkin = new ZombieSkin(AssetLib.getManifest(ZombieManifest.NAME));

    zombieSkin.init();
    zombieSkin.setProperty("x", StageSetup.canvas.width * 2 + 50);
    zombieSkin.setProperty("y", 440 + yPos);

    /**
     * @type {ZombieConfigVO}
     */
    var zombieType = ZombieConfigVO.NORMAL_ZOMBIE;

    // Create player component
    var zombieComponent = new ZombieComponent(zombieSkin, zombieType.speed * (1 + yPos / 1000));
    zombieComponent.snapTo(StageSetup.canvas.width * 2 + 50);
    zombieComponent.move(StageSetup.canvas.width + 200 + yPos * 2);

    var uid = zombieProxy.addZombie(zombieType);

    this.facade.sendNotification(ZombieComponentNoteBody.DO_ADD_ZOMBIE, new ZombieComponentNoteBody(uid, zombieComponent));
};