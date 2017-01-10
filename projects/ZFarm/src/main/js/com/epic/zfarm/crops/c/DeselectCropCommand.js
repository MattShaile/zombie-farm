goog.provide('com.epic.zfarm.crops.c.DeselectCropCommand');

goog.require('com.epic.zfarm.crops.m.CropProxy');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function DeselectCropCommand() {
}

goog.inherits(DeselectCropCommand, puremvc.SimpleCommand);

DeselectCropCommand.prototype.execute = function (note) {
    var cropProxy = this.facade.retrieveProxy(CropProxy.NAME);

    cropProxy.setSelectedCropIndex(-1);
};