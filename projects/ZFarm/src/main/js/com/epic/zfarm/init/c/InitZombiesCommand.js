goog.provide('com.epic.zfarm.init.c.InitZombiesCommand');

goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');
goog.require('com.epic.zfarm.zombie.v.component.ZombieManagerComponent');
goog.require('com.epic.zfarm.zombie.v.ZombieMediator');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function InitZombiesCommand() {
}

goog.inherits(InitZombiesCommand, puremvc.SimpleCommand);

InitZombiesCommand.prototype.execute = function (note) {
    // Get containers
    var root = StageSetup.rootContainer;

    this.facade.registerProxy(new ZombiesProxy());

    var zombieContainer = new createjs.Container();

    root.addChild(zombieContainer);

    var zombieManagerComponent = new ZombieManagerComponent(zombieContainer);

    var zombieManagerMediator = new ZombieMediator(zombieManagerComponent);

    this.facade.registerMediator(zombieManagerMediator);
};