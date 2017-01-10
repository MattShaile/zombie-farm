goog.provide('com.epic.zfarm.crops.v.component.CropComponent');

goog.require('com.epic.zfarm.crops.v.event.CropEvent');
goog.require('com.epic.zfarm.crops.v.skin.CropSkin');


/**
 * @constructor
 * @param skin {CropSkin}
 */
function CropComponent(skin) {
    createjs.EventDispatcher.initialize(CropComponent.prototype);

    /**
     * @type {CropSkin}
     */
    this.skin = skin;

    /**
     * @type {Number}
     */
    this.id = null;
}

CropComponent.prototype.init = function (id) {
    this.id = id;

    this.skin.getEventDispatcher().addEventListener("click", this);
};

CropComponent.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "click":
            this.dispatchEvent(new CropEvent(CropEvent.EVENT_CROP_CLICKED, this, this.id));
            break;
    }
};

/**
 * @param soilFrame {String}
 * @param cropName  {String}
 * @param cropStage {Number}
 */
CropComponent.prototype.setState = function (soilFrame, cropName, cropStage) {
    this.skin.setProperty(CropSkin.PROPERTY_SOIL_FRAME, soilFrame);

    if (cropStage > 0) {
        this.skin.changeState(CropSkin.STATE_PLANTED);
        this.skin.setProperty(CropSkin.PROPERTY_CROP_FRAME, cropName + cropStage.toString());
    } else {
        this.skin.changeState(CropSkin.STATE_EMPTY);
    }
};

/**
 * @param dry {Boolean}
 */
CropComponent.prototype.setDry = function (dry) {
    this.skin.setProperty(CropSkin.PROPERTY_IS_DRY, dry);
};