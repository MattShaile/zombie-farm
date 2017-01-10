goog.provide('com.epic.zfarm.inventory.m.vo.FarmItemConfigVO');

goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');


/**
 * @constructor
 */
FarmItemConfigVO = function (id, label, inventoryType) {
    goog.base(this, id, label, inventoryType);
};

goog.inherits(FarmItemConfigVO, ItemConfigVO);


/**
 * @type {String}
 * @static
 * @constant
 */
FarmItemConfigVO.INVENTORY_TYPE = "farm";

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
FarmItemConfigVO.FORK = new FarmItemConfigVO(1, "fork", FarmItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
FarmItemConfigVO.SPADE = new FarmItemConfigVO(2, "spade", FarmItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
FarmItemConfigVO.WATER = new FarmItemConfigVO(3, "water", FarmItemConfigVO.INVENTORY_TYPE);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
FarmItemConfigVO.SEEDS = new FarmItemConfigVO(4, "tomatoes", FarmItemConfigVO.INVENTORY_TYPE);

/**
 * @type {Array}
 * @static
 */
FarmItemConfigVO.getAll = function(){
    var all = [];
    all.push(FarmItemConfigVO.FORK);
    //all.push(FarmItemConfigVO.SPADE);
    //all.push(FarmItemConfigVO.WATER);
    //all.push(FarmItemConfigVO.SEEDS);

    return all;
};