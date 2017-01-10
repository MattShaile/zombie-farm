goog.provide('com.epic.common.util.Utils');

goog.require('com.epic.common.util.StageSetup');


/**
 * @class
 */
var Utils = {};

/**
 * Loops through all properties within an object (non-recursively) and deletes them
 * @static
 * @param obj
 */
Utils.clearObject = function (obj) {
    for (var prop in obj) {
        obj[prop] = null;
        delete obj[prop];
    }

    delete obj;
};

/**
 * Returns a string with the first letter converted to upper case
 * @static
 * @example Utils.upperCaseFirst("helloWorld"); // HelloWorld
 * @param {string} str
 * @returns {string}
 */
Utils.upperCaseFirst = function (str) {
    return str.charAt(0).toUpperCase() + str.substring(1, str.length);
};

/**
 * Returns a modulo without the js bug
 * @static
 * @example Utils.modulo(-75, 100); // 25
 * @param {Number} n1
 * @param {Number} n2
 * @returns {Number}
 */
Utils.mod = function (n1, n2) {
    return ((n1 % n2) + n2) % n2;
};

/**
 * Returns an array of co-ordinates derived from a bit mask
 * @example
 * Utils.getCoordinatesFromBitMask(23) // (10111) would return [0,1,2,4]
 * Utils.getCoordinatesFromBitMask(102) // (1100110) would return [0,1,4,5]
 * @param bitMask {Number}
 */
Utils.getCoordinatesFromBitMask = function (bitMask) {
    var binaryArr = bitMask.toString(2).split("");

    var results = [];

    for (var i = 0; i < binaryArr.length; i++) {
        if (binaryArr[i] == "1") {
            results.push(binaryArr.length - 1 - i);
        }
    }

    return results;
};

/**
 * Use exactly like set timeout only
 * @param func {Function}
 * @param timeoutMS {Number}
 * @param repeat {Number}
 * @return {Number}
 */
Utils.setFrameTimeout = function (func, timeoutMS) {
    timeoutMS = Math.floor(timeoutMS / StageSetup.fps);

    var id;
    do {
        id = Math.floor(Math.random() * 10000);
    } while (!(Utils.timeoutTweenObjects[id] == null || Utils.timeoutTweenObjects[id] == undefined));

    Utils.timeoutTweenObjects[id] = {};

    var params = Array.prototype.slice.call(arguments).slice(2, arguments.length);

    createjs.Tween.get(Utils.timeoutTweenObjects[id], {"loop": false, "useTicks": true})
        .wait(timeoutMS)
        .call(function () {
            func(params);
            Utils.clearFrameTimeout(id);
        });

    return id;
};

/**
 * Use exactly like set timeout only
 * @param func
 * @param timeoutMS
 */
Utils.clearFrameTimeout = function (id) {
    if (Utils.timeoutTweenObjects[id]) {
        createjs.Tween.removeTweens(Utils.timeoutTweenObjects[id]);
        Utils.timeoutTweenObjects[id] = null;
    }
};

Utils.timeoutTweenObjects = {};