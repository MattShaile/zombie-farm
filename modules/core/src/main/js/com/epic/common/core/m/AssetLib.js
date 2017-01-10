goog.provide('com.epic.common.core.m.AssetLib');




/**
 * Holds a reference to all of the games asset manifests
 * @class
 */
var AssetLib = {};

/**
 * Adds a manifest to the asset lib
 * @param id {String}        ID of the manifest
 * @param manifest {*}       The manifest
 * @static
 */
AssetLib.addManifest = function (id, manifest) {
    AssetLib.manifests[id] = manifest;
};

/**
 * Gets a manifest by it's id
 * @param id {String}        ID of the manifest
 * @return {*}
 * @static
 */
AssetLib.getManifest = function (id) {
    return AssetLib.manifests[id];
};

/**
 * Returns a complete list of manifests (usually used to supply the preloader with a list)
 * @return {Array}
 */
AssetLib.getAllManifests = function () {
    var manifests = [];

    for (var manifest in AssetLib.manifests) {
        manifests.push(AssetLib.manifests[manifest]);
    }

    return manifests;
};

/**
 * @type {Object}
 * @static
 */
AssetLib.manifests = {};