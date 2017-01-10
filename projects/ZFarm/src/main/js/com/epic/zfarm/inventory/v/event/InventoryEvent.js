goog.provide('com.epic.zfarm.inventory.v.event.InventoryEvent');




/**
 * @constructor
 */
function InventoryEvent(type, target, id) {
    /**
     * @type {String}
     */
    this.type = type;

    /**
     * @type {*}
     */
    this.target = target;

    /**
     * @type {Number}
     */
    this.id = id;
}

/**
 * @returns {Number}
 */
InventoryEvent.prototype.getId = function () {
    return this.id;
};

/**
 * @type {string}
 */
InventoryEvent.EVENT_ITEM_CLICKED = "eventItemClicked";