goog.provide('com.epic.zfarm.inventory.m.vo.ItemConfigVO');




/**
 * @param id
 * @param label
 * @param inventoryType
 * @constructor
 */
ItemConfigVO = function (id, label, inventoryType) {
    this.id = id;
    this.label = label;
    this.inventoryType = inventoryType;
};

/**
 * @type {Number}
 */
ItemConfigVO.prototype.id = null;

/**
 * @type {String}
 */
ItemConfigVO.prototype.label = null;

/**
 * @type {String}
 */
ItemConfigVO.prototype.inventoryType = null;