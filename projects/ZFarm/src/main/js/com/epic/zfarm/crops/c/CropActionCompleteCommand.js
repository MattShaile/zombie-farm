goog.provide('com.epic.zfarm.crops.c.CropActionCompleteCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');
goog.require('com.epic.zfarm.crops.m.vo.CropVO');
goog.require('com.epic.zfarm.crops.m.vo.SoilConfigVO');
goog.require('com.epic.zfarm.inventory.m.InventoryProxy');
goog.require('com.epic.zfarm.inventory.m.vo.SeedPacketItemConfigVO');
goog.require('com.epic.zfarm.player.note.PlayerNoteBody');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function CropActionCompleteCommand() {
}

goog.inherits(CropActionCompleteCommand, puremvc.SimpleCommand);

CropActionCompleteCommand.prototype.execute = function (note) {
    /**
     * @type {CropProxy}
     */
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    /**
     * @type {CropVO}
     */
    var cropVO = cropProxy.getSelectedCrop();

    if (cropVO.soilState == SoilConfigVO.MESSY) {
        this.hoeCrop(cropVO);
    } else if (cropVO.plant == null) {
        this.plantCrop(cropVO);
    } else if (cropVO.growthLevel == cropVO.plant.numStages) {
        this.harvestCrop(cropVO);
    } else if (cropVO.soilState == SoilConfigVO.HOED) {
        this.waterCrop(cropVO);
    }

    this.facade.sendNotification(PlayerNoteBody.DO_IDLE, new PlayerNoteBody());
};

/**
 * @param cropVO
 */
CropActionCompleteCommand.prototype.hoeCrop = function (cropVO) {
    // Hoe crop
    cropVO.soilState = SoilConfigVO.HOED;
};

/**
 * @param cropVO
 */
CropActionCompleteCommand.prototype.plantCrop = function (cropVO) {
    /**
     * @type {InventoryProxy}
     */
    var inventoryProxy = this.facade.retrieveProxy(InventoryProxy.NAME);

    /**
     * @type {SeedPacketItemConfigVO}
     */
    var seedPacket = inventoryProxy.getSelectedSeedPacketItem();

    if(seedPacket)
    {
        // Plant the crop
        cropVO.plant = seedPacket.getCrop();
    }
    else
    {
        //this should never happen
        console.log('[CropActionCompleteCommand] Error - crop was told to plant but there is no seed packet to plant from');
    }
};

/**
 * @param cropVO
 */
CropActionCompleteCommand.prototype.waterCrop = function (cropVO) {
    /**
     * @type {CropProxy}
     */
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    /**
     * @type {Number}
     */
    var cropIndex = cropProxy.getSelectedCropIndex();

    // Wet the soil and grow the plant. Begin dry out timer
    cropVO.soilState = SoilConfigVO.WET;
    cropVO.growthLevel++;

    if (cropVO.growthLevel < cropVO.plant.numStages) {
        cropProxy.startDryout(cropIndex);
    }
};

/**
 * @param cropVO
 */
CropActionCompleteCommand.prototype.harvestCrop = function (cropVO) {
    // Reset crop, add crop to inventory
    cropVO.soilState = SoilConfigVO.MESSY;
    cropVO.growthLevel = 0;
    cropVO.plant = null;
};