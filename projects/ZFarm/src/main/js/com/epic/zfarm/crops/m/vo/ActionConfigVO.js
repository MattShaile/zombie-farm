goog.provide('com.epic.zfarm.crops.m.vo.ActionConfigVO');

goog.require('com.epic.zfarm.crops.m.vo.SoilConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.FarmItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ZombieItemConfigVO');


/**
 * @param animationName {String}
 * @param time {Number}
 * @param requiredItem {ItemConfigVO}
 * @constructor
 */
ActionConfigVO = function (animationName, time, requiredItem) {
    this.animationName = animationName;
    this.time = time;
    this.requiredItem = requiredItem;
}

/**
 * @type {String}
 */
ActionConfigVO.prototype.animationName = null;

/**
 * @type {Number}
 */
ActionConfigVO.prototype.time = null;

/**
 * @type {ItemConfigVO}
 */
ActionConfigVO.prototype.requiredItem = null;

/**
 * @returns {Number}
 */
ActionConfigVO.prototype.getTime = function () {
    return this.time;
}

/**
 * @returns {String}
 */
ActionConfigVO.prototype.getAnimationName = function () {
    return this.animationName;
}

/**
 * @returns {ItemConfigVO}
 */
ActionConfigVO.prototype.getRequiredItem = function () {
    return this.requiredItem;
}

/**
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.HOE = new ActionConfigVO("tool", 2500, FarmItemConfigVO.FORK);

/**
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.PLANT_SELECT = new ActionConfigVO("seeds", 2500, FarmItemConfigVO.SEEDS);

/**
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.PLANT = new ActionConfigVO("seeds", 2500, FarmItemConfigVO.SEEDS);

/**
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.HARVEST = new ActionConfigVO("tool", 1500, FarmItemConfigVO.SPADE);

/**
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.WATER = new ActionConfigVO("water", 2500, FarmItemConfigVO.WATER);

/**
 * //todo maybe this will work this way for the zombies, maybe it wont
 * @type {ActionConfigVO}
 * @static
 * @constant
 */
ActionConfigVO.SHOOT_1 = new ActionConfigVO("shoot", 500, ZombieItemConfigVO.WEAPON_1);


ActionConfigVO.getActionForCropVO = function (cropVO) {
    if (cropVO) {
        if (cropVO.soilState == SoilConfigVO.MESSY) {
            return ActionConfigVO.HOE;
        } else if (cropVO.plant == null) {
            return ActionConfigVO.PLANT;
        } else if (cropVO.growthLevel == cropVO.plant.numStages) {
            return ActionConfigVO.HARVEST;
        } else if (cropVO.soilState == SoilConfigVO.HOED) {
            return ActionConfigVO.WATER;
        }
    }
    return null;
};