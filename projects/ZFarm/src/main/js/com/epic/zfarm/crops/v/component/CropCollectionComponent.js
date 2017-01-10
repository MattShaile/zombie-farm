goog.provide('com.epic.zfarm.crops.v.component.CropCollectionComponent');

goog.require('com.epic.zfarm.crops.v.component.CropComponent');
goog.require('com.epic.zfarm.crops.v.event.CropEvent');


/**
 * @constructor
 */
function CropCollectionComponent() {
    createjs.EventDispatcher.initialize(CropCollectionComponent.prototype);

    /**
     * @type {Array}
     */
    this.cropComponents = [];
};

/**
 * Adds a crop component to the collection on start up
 * @param cropComponent {CropComponent}
 */
CropCollectionComponent.prototype.addCropComponent = function (cropComponent) {
    cropComponent.init(this.cropComponents.length);
    cropComponent.addEventListener(CropEvent.EVENT_CROP_CLICKED, this);

    this.cropComponents.push(cropComponent);
};

CropCollectionComponent.prototype.handleEvent = function (event) {
    switch (event.type) {
        case CropEvent.EVENT_CROP_CLICKED:
            this.dispatchEvent(event);
            break;
    }
};

/**
 * @param id            {Number}
 * @param soilFrame     {String}
 * @param cropName      {String}
 * @param cropStage     {Number}
 */
CropCollectionComponent.prototype.setCropState = function (id, soilFrame, cropName, cropStage) {
    /**
     * @type {CropComponent}
     */
    var cropComponent = this.cropComponents[id];

    if (cropComponent) {
        cropComponent.setState(soilFrame, cropName, cropStage);
    }
};

/**
 * @param id             {Number}
 * @param dry            {Boolean}
 */
CropCollectionComponent.prototype.setCropDry = function (id, dry) {
    /**
     * @type {CropComponent}
     */
    var cropComponent = this.cropComponents[id];

    if (cropComponent) {
        cropComponent.setDry(dry);
    }
};