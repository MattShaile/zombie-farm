goog.provide('com.epic.common.util.QuickText');

goog.require('com.epic.common.text.v.skins.EaselTextSkin');


/**
 * Helper class for creating text fields quickly and saving / reusing templates
 * @class
 */
var QuickText = {};

QuickText.templates = {};

/**
 * Create a textfield in 1 line of code
 * @param font {String}             Example: "44px 'Denk One'"
 * @param stroke {String}           Example: "4px #000"
 * @param color {String}
 * @param [x=0] {Number}
 * @param [y=0] {Number}
 * @param [maxWidth=null] {Number}      Single line text
 * @param [lineWidth=null] {Number}     Multi line text
 * @param [lineHeight=null] {Number}    Multi line text
 * @return {EaselTextSkin}
 */
QuickText.createText = function (text, font, stroke, color, x, y, maxWidth, lineWidth, lineHeight) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : null;
    lineHeight = typeof lineHeight !== 'undefined' ? lineHeight : null;
    maxWidth = typeof maxWidth !== 'undefined' ? maxWidth : null;

    var tf = new EaselTextSkin();
    tf.setProperty("text", text);
    tf.setProperty("font", font);
    tf.setProperty("stroke", stroke);
    tf.setProperty("color", color);
    tf.setProperty("x", x);
    tf.setProperty("y", y);
    tf.setProperty("maxWidth", maxWidth);
    tf.setProperty("lineWidth", lineWidth);
    tf.setProperty("lineHeight", lineHeight);

    return tf;
};

/**
 * Add template for quick creation
 * @param id {String}
 * @param font {String}             Example: "44px 'Denk One'"
 * @param stroke {String}           Example: "4px #000"
 * @param color {String}
 * @param [lineWidth=null] {Number}
 * @param [lineHeight=null] {Number}
 */
QuickText.addTemplate = function (id, font, stroke, color, lineWidth, lineHeight) {
    lineWidth = typeof lineWidth !== 'undefined' ? lineWidth : null;
    lineHeight = typeof lineHeight !== 'undefined' ? lineHeight : null;

    QuickText.templates[id] = ["", font, stroke, color, 0, 0, null, lineWidth, lineHeight];
};

/**
 * Retrieve a template and instantiate a new tf from it
 * @param id {String}
 * @param [text=""] {String}
 * @param [x=0] {Number}
 * @param [y=0] {Number}
 * @param [maxWidth=null] {Number}
 * @returns {EaselTextSkin}
 */
QuickText.createTemplate = function (id, text, x, y, maxWidth) {
    text = typeof text !== 'undefined' ? text : "";
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    maxWidth = typeof maxWidth !== 'undefined' ? maxWidth : null;

    QuickText.templates[id][0] = text;
    QuickText.templates[id][4] = x;
    QuickText.templates[id][5] = y;
    QuickText.templates[id][6] = maxWidth;

    return QuickText.createText.apply(this, QuickText.templates[id]);
};