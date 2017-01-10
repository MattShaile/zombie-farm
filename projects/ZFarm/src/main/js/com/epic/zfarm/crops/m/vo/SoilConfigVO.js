goog.provide('com.epic.zfarm.crops.m.vo.SoilConfigVO');




/**
 * @param label         {String}
 * @constructor
 */
SoilConfigVO = function (label) {
    this.label = label;
}

/**
 * @type {String}
 */
SoilConfigVO.prototype.label = null;

/**
 * @type {SoilConfigVO}
 * @static
 * @constant
 */
SoilConfigVO.WET = new SoilConfigVO("wateredPlot");

/**
 * @type {SoilConfigVO}
 * @static
 * @constant
 */
SoilConfigVO.HOED = new SoilConfigVO("hoedPlot");

/**
 * @type {SoilConfigVO}
 * @static
 * @constant
 */
SoilConfigVO.MESSY = new SoilConfigVO("messyPlot");