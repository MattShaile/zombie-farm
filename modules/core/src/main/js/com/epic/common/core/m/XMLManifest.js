goog.provide('com.epic.common.core.m.XMLManifest');




/**
 * @constructor
 */
function XMLManifest() {
}

/**
 * Sets the xml object
 * @param {Object} xml
 */
XMLManifest.prototype.setXML = function (xml) {
    this.xml = xml;
};

/**
 * Gets a list of xml files to load and their id's
 * @returns {Array}
 */
XMLManifest.prototype.getXML = function () {
    return [];
};