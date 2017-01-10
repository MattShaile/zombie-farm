goog.provide('com.epic.zfarm.crops.m.vo.CropConfigVO');




/**
 * @param id            {Number}
 * @param label         {String}
 * @param dryoutTime    {Number}
 * @param numStages     {Number}
 * @constructor
 */
CropConfigVO = function (id, label, dryoutTime, numStages) {
    this.id = id;
    this.label = label;
    this.dryoutTime = dryoutTime;
    this.numStages = numStages;
}

/**
 * @type {Number}
 */
CropConfigVO.prototype.id = null;

/**
 * @type {String}
 */
CropConfigVO.prototype.label = null;

/**
 * @type {Number}
 */
CropConfigVO.prototype.dryoutTime = null;

/**
 * @type {Number}
 */
CropConfigVO.prototype.numStages = null;

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.TOMATOES = new CropConfigVO(1, "tomato", 10000, 4);

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.APPLES = new CropConfigVO(1, "apples", 10000, 4);

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.ORANGES = new CropConfigVO(1, "oranges", 10000, 4);

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.STRAWBERRIES = new CropConfigVO(1, "strawberries", 10000, 4);

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.WATERMELONS = new CropConfigVO(1, "watermelons", 10000, 4);


/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.BANANAS = new CropConfigVO(1, "bananas", 10000, 4);

/**
 * @type {CropConfigVO}
 * @static
 * @constant
 */
CropConfigVO.GRAPES = new CropConfigVO(1, "grapes", 10000, 4);