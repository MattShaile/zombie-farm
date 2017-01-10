goog.provide('com.epic.zfarm.crops.m.vo.CropVO');

goog.require('com.epic.zfarm.crops.m.vo.CropConfigVO');
goog.require('com.epic.zfarm.crops.m.vo.SoilConfigVO');


function CropVO() {
    /**
     * @type {SoilConfigVO}
     */
    this.soilState = SoilConfigVO.MESSY;

    /**
     * @type {CropConfigVO}
     */
    this.plant = null;

    /**
     * @type {number}
     */
    this.growthLevel = 0;

    /**
     * @type {Number}
     */
    this.position = 0;
};