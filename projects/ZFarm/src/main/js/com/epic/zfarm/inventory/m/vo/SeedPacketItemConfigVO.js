goog.provide('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');

goog.require('com.epic.zfarm.crops.m.vo.CropConfigVO');
goog.require('com.epic.zfarm.inventory.m.vo.ItemConfigVO');


/**
 * @param id {number}
 * @param label {string}
 * @param inventoryType {string}
 * @param cropConfigVO {CropConfigVO}
 * @constructor
 */
SeedPacketItemConfigVO = function (id, label, inventoryType, cropConfigVO) {
    goog.base(this, id, label, inventoryType);
    this.cropConfigVO = cropConfigVO;
};

goog.inherits(SeedPacketItemConfigVO, ItemConfigVO);

/**
 * @returns {SeedPacketItemConfigVO}
 */
SeedPacketItemConfigVO.prototype.getCrop = function() {
    return this.cropConfigVO;
}

/**
 * @type {String}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.INVENTORY_TYPE = "seedpacket";

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.TOMATOES = new SeedPacketItemConfigVO(1, "tomatoes", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.TOMATOES);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.ORANGES = new SeedPacketItemConfigVO(2, "oranges", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.ORANGES);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.APPLES = new SeedPacketItemConfigVO(3, "apples", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.APPLES);

/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.STRAWBERRIES = new SeedPacketItemConfigVO(4, "strawberries", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.STRAWBERRIES);
/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.WATERMELONS = new SeedPacketItemConfigVO(4, "watermelons", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.WATERMELONS);
/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.BANANAS = new SeedPacketItemConfigVO(4, "bananas", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.BANANAS);
/**
 * @type {ItemConfigVO}
 * @static
 * @constant
 */
SeedPacketItemConfigVO.GRAPES = new SeedPacketItemConfigVO(4, "grapes", SeedPacketItemConfigVO.INVENTORY_TYPE, CropConfigVO.GRAPES);

/**
 * @type {Array}
 * @static
 */
SeedPacketItemConfigVO.getAll = function(){
    var all = [];
    all.push(SeedPacketItemConfigVO.TOMATOES);
    all.push(SeedPacketItemConfigVO.ORANGES);
    all.push(SeedPacketItemConfigVO.APPLES);
    all.push(SeedPacketItemConfigVO.STRAWBERRIES);
    all.push(SeedPacketItemConfigVO.WATERMELONS);
    all.push(SeedPacketItemConfigVO.BANANAS);
    all.push(SeedPacketItemConfigVO.GRAPES);

    return all;
};