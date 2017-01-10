goog.provide('com.epic.zfarm.zombie.m.vo.ZombieConfigVO');




/**
 * @param speed            {Number}
 * @param hp            {Number}
 * @param type         {String}
 * @constructor
 */
ZombieConfigVO = function (speed, hp, type) {
    this.speed = 0.5;
    this.hp = hp
    this.type = type;
}

/**
 * @type {ZombieConfigVO}
 * @static
 * @constant
 */
ZombieConfigVO.NORMAL_ZOMBIE = new ZombieConfigVO(0.5, 3, "normal");