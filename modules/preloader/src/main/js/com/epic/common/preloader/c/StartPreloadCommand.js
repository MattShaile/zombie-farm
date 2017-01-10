goog.provide('com.epic.common.preloader.c.StartPreloadCommand');

goog.require('com.epic.common.preloader.m.PreloaderProxy');


/**
 * Preload command
 * Loads assets, then invokes the startup notification
 *
 * @extends {puremvc.SimpleCommand}
 * @constructor
 */
function StartPreloadCommand() {
}

goog.inherits(StartPreloadCommand, puremvc.SimpleCommand);


/**
 * Command execute function
 * @param {puremvc.Notification} note The notification sent with this command call
 */
StartPreloadCommand.prototype.execute = function (note) {
    var manifests = note.getBody().manifests;

    var preloaderProxy = this.facade.retrieveProxy(PreloaderProxy.NAME);
    preloaderProxy.loadManifest(manifests);
};