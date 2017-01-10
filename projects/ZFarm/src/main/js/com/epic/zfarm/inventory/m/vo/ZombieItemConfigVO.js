goog.provide('com.epic.zfarm.inventory.m.vo.ZombieItemConfigVO');

goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');


/**
 * @constructor
 */
ZombieItemConfigVO = function (id, label, inventoryType) {
    goog.base(this, id, label, inventoryType);
}

goog.inherits(ZombieItemConfigVO, ItemConfigVO);

/**
 * @type {String}
 * @static
 * @constant
 */
ZombieItemConfigVO.INVENTORY_TYPE = "zombie";


/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
ZombieItemConfigVO.WEAPON_1 = new ZombieItemConfigVO(1, "rifle", ZombieItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
ZombieItemConfigVO.WEAPON_2 = new ZombieItemConfigVO(2, "minigun", ZombieItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
ZombieItemConfigVO.WEAPON_3 = new ZombieItemConfigVO(3, "shotgun", ZombieItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
ZombieItemConfigVO.WEAPON_4 = new ZombieItemConfigVO(4, "pistol", ZombieItemConfigVO.INVENTORY_TYPE);

/**
 * @type {Array}
 * @static
 * @constant
 */
ZombieItemConfigVO.getAll = function(){
    var all = [];
    all.push(ZombieItemConfigVO.WEAPON_1);
    all.push(ZombieItemConfigVO.WEAPON_2);
    all.push(ZombieItemConfigVO.WEAPON_3);
    all.push(ZombieItemConfigVO.WEAPON_4);

    return all;
};