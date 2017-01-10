goog.provide("com.epic.common.preloader.m.PreloaderProxy");

goog.require('com.epic.common.preloader.PreloaderConstants');


/**
 * Proxy responsible for preloading a manifest of files and storing them
 *
 * @extends {puremvc.Proxy}
 * @constructor
 */
function PreloaderProxy() {
    var dataObject = {
        "manifests": null,
        "images": {},
        "xml": {},
        "sounds": {}
    };
    puremvc.Proxy.call(this, PreloaderProxy.NAME, dataObject);
}

goog.inherits(PreloaderProxy, puremvc.Proxy);

/**
 * Proxy NAME constant
 * @const
 * @type string
 */
PreloaderProxy.NAME = "PreloaderProxy";

/**
 * Loads a manifest of images using preloadJS
 * @param {*} manifests
 */
PreloaderProxy.prototype.loadManifest = function (manifests) {
    var inst = this;

    var queue = new createjs.LoadQueue();

    queue.installPlugin(createjs.Sound);
    createjs.Sound.alternateExtensions = ["mp3", "ogg"];

    queue.addEventListener("fileload", function (e) {
        inst.handleFileLoad(e);
    });
    queue.addEventListener("progress", function (e) {
        inst.handleProgressUpdate(e);
    });
    queue.addEventListener("complete", function (e) {
        inst.handleComplete(e);
    });

    this.data.images = [];
    this.data.xml = [];
    this.data.sounds = [];
    this.data.manifests = manifests;

    var allManifests = [];

    var srcs = [];

    for (var i = 0; i < manifests.length; i++) {
        this.data.images.push(null);
        this.data.xml.push(null);
        this.data.sounds.push(null);

        var manifest;
        if (manifests[i].getImages) {
            manifest = manifests[i].getImages();
        } else if (manifests[i].getXML) {
            manifest = manifests[i].getXML();
        } else {
            manifest = manifests[i].getSounds();
        }

        for (var j = 0; j < manifest.length; j++) {
            var item = manifest[j];
            item.src = item.src;
            srcs.push(item.src);
            item.data = {"manifestID": i};
        }

        allManifests = allManifests.concat(manifest);
    }

    queue.loadManifest(allManifests);

};

/**
 * When each file is loaded, add to dataObject
 * @private
 * @param event
 */
PreloaderProxy.prototype.handleFileLoad = function (event) {
    var item = event.item; // A reference to the item that was passed in
    var type = item.type;
    var id = item.id;


    var o;

    // Add any images to the page body
    switch (type) {
        case createjs.LoadQueue.IMAGE:
        case createjs.LoadQueue.JSON:
            o = this.data.images;
            break;
        case createjs.LoadQueue.XML:
            o = this.data.xml;
            break;
        case createjs.LoadQueue.SOUND:
            o = this.data.sounds;
            break;
    }

    if (!o[item.data.manifestID]) {
        o[item.data.manifestID] = {};
    }

    o[item.data.manifestID][id] = event.result;
};

/**
 * Sends a notification when progress is made
 * @private
 * @param event
 */
PreloaderProxy.prototype.handleProgressUpdate = function (event) {
    this.facade.sendNotification(PreloaderConstants.WHEN_PRELOADER_PROGRESS, {progress: event.target.progress});
};

/**
 * Sends a final progress update and a complete notification
 * @private
 * @param event
 */
PreloaderProxy.prototype.handleComplete = function (event) {
    for (var i = 0; i < this.data.manifests.length; i++) {
        if (this.data.images[i]) {
            this.data.manifests[i].setImages(this.data.images[i]);
        } else if (this.data.xml[i]) {
            this.data.manifests[i].setXML(this.data.xml[i]);
        } else if (this.data.sounds[i]) {
            this.data.manifests[i].setSounds(this.data.sounds[i]);
        }
    }

    this.facade.sendNotification(PreloaderConstants.WHEN_PRELOADER_PROGRESS, {progress: 1});
    this.facade.sendNotification(PreloaderConstants.WHEN_PRELOADER_COMPLETE);
};