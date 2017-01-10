goog.provide('com.epic.zfarm.crops.m.CropProxy');

goog.require('com.epic.zfarm.crops.m.vo.CropVO');
goog.require('com.epic.zfarm.crops.m.vo.SoilConfigVO');
goog.require('com.epic.zfarm.crops.note.CropNoteBody');
goog.require('com.epic.common.util.event.TimerEvent');
goog.require('com.epic.common.util.Timer');


function CropProxy() {
    var dataObject = {
        "selectedCropIndex": null,
        "crops": [new CropVO(), new CropVO(), new CropVO(), new CropVO(), new CropVO()],
        "dryoutTimers": [null, null, null, null, null]
    };

    puremvc.Proxy.call(this, CropProxy.NAME, dataObject);

    // Close scope functions
    var inst = this;

    this.dryoutCompleteHandler = function (e) {
        inst.dryoutComplete(e);
    }
}

goog.inherits(CropProxy, puremvc.Proxy);

CropProxy.NAME = "CropProxy";

/**
 * @returns {CropVO}
 */
CropProxy.prototype.getSelectedCrop = function () {
    return this.data.crops[this.data.selectedCropIndex];
};

/**
 * @param index {Number}
 * @returns {CropVO}
 */
CropProxy.prototype.getCropByIndex = function (index) {
    return this.data.crops[index];
};

/**
 * @returns {Number}
 */
CropProxy.prototype.getSelectedCropIndex = function () {
    return this.data.selectedCropIndex;
};

/**
 * @param value {Number}
 */
CropProxy.prototype.setSelectedCropIndex = function (value) {
    this.data.selectedCropIndex = value;
};

/**
 * @returns {Number}
 */
CropProxy.prototype.getNumDryCrops = function () {
    var numDryCrops = 0;

    /**
     * @type {CropVO}
     */
    var cropVO;

    for (var i = 0; i < this.data.crops.length; i++) {
        cropVO = this.data.crops[i];

        if (cropVO.soilState == SoilConfigVO.HOED && cropVO.plant) {
            numDryCrops++;
        }
    }

    return numDryCrops;
}

/**
 * @param cropIndex {Number}
 */
CropProxy.prototype.startDryout = function (cropIndex) {
    /**
     * @type {CropVO}
     */
    var crop = this.data.crops[cropIndex];

    /**
     * @type {Timer}
     */
    var timer = this.data.dryoutTimers[cropIndex];

    if (timer) {
        timer.removeEventListener(TimerEvent.COMPLETE, this.dryoutCompleteHandler);

        timer.stop();

        timer = null;
    }

    timer = new Timer(crop.plant.dryoutTime, 1);

    this.data.dryoutTimers[cropIndex] = timer;

    timer.addEventListener(TimerEvent.COMPLETE, this.dryoutCompleteHandler);

    timer.start();
};

/**
 * @param e {TimerEvent}
 */
CropProxy.prototype.dryoutComplete = function (e) {
    /**
     * @type {Array}
     */
    var timers = this.data.dryoutTimers;

    /**
     * @type {Timer}
     */
    var timer;

    for (var i = 0; i < timers.length; i++) {

        timer = timers[i];

        if (e.target == timer) {
            timer.removeEventListener(TimerEvent.COMPLETE, this.dryoutCompleteHandler);

            timer.stop();

            timer = null;

            this.getCropByIndex(i).soilState = SoilConfigVO.HOED;
            this.facade.sendNotification(CropNoteBody.WHEN_CROP_UPDATED, new CropNoteBody(i));

            break;
        }
    }
};