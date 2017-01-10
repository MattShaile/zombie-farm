goog.provide('com.epic.common.preloader.c.PreloadCompleteCommand');

goog.require('com.epic.common.preloader.PreloaderConstants');
goog.require('com.epic.common.preloader.v.PreloaderMediator');
goog.require('com.epic.common.util.StageSetup');


/**
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function PreloadCompleteCommand() {
}

goog.inherits(PreloadCompleteCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
PreloadCompleteCommand.prototype.execute = function (note) {
    this.facade.sendNotification(PreloaderConstants.DO_COMPLETE_PRELOADER);

    this.facade.removeMediator(PreloaderMediator.NAME);

    StageSetup.gameLoaded = true;
};