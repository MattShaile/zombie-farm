goog.provide('com.epic.zfarm.zombie.c.StartZombieSpawningCommand');

goog.require('com.epic.zfarm.zombie.m.ZombiesProxy');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function StartZombieSpawningCommand() {
}

goog.inherits(StartZombieSpawningCommand, puremvc.SimpleCommand);

StartZombieSpawningCommand.prototype.execute = function (note) {
    var zombieProxy = this.facade.retrieveProxy(ZombiesProxy.NAME);
    zombieProxy.startSpawnTimer(100, 5500);
};