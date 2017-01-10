goog.provide('com.epic.common.util.UserAgent');




/**
 * @class
 */
var UserAgent = {};

/**
 * Detects whether the browser is chrome
 * @static
 * @return Boolean
 */
UserAgent.isChrome = function () {
    var isChromium = window.chrome;
    var vendorName = window.navigator.vendor;
    return (isChromium === true && vendorName === "Google Inc.") || (navigator.userAgent.toLowerCase().indexOf("chrome") != -1);
};

/**
 * Detects whether the browser is android stock
 * @static
 * @returns {boolean}
 */
UserAgent.isAndroid = function () {
    return navigator.userAgent.toLowerCase().indexOf("android") != -1 && !UserAgent.isChrome();
};

/**
 * Detects whether the browser is safari
 * @static
 * @return Boolean
 */
UserAgent.isSafari = function () {
    return navigator.userAgent.toLowerCase().indexOf("apple") != -1 && !UserAgent.isChrome() && !UserAgent.isAndroid();
};

/**
 * Detects whether the browser is neither chrome nor safari
 * @static
 * @return Boolean
 */
UserAgent.isOther = function () {
    return !UserAgent.isChrome() && !UserAgent.isSafari();
};

/**
 * Detects whether the device is a Samsung Galaxy S3
 * @static
 * @return Boolean
 */
UserAgent.isSamsungS3 = function () {
    var isSamsung = false;

    var samsungModels = ["GT-I9300", "GT-I9305", "SHV-E210", "SGH-T999", "SGH-I747", "SGH-N064", "SGH-N035", "SCH-J021", "SCH-R530", "SCH-I535", "SPH-L710", "GT-I9308", "SCH-I939"];

    for (var i = 0; i < samsungModels.length; i++) {
        if (navigator.userAgent.toLowerCase().indexOf(samsungModels[i]) != -1) {
            isSamsung = true;
            break;
        }
    }

    return isSamsung;
};

/**
 * Detects whether the device is a Samsung Galaxy S2
 * @static
 * @return Boolean
 */
UserAgent.isSamsungS2 = function () {
    var isSamsung = false;

    // TODO: Update this list to include all
    var samsungModels = ["GT-I9100"];

    for (var i = 0; i < samsungModels.length; i++) {
        if (navigator.userAgent.toLowerCase().indexOf(samsungModels[i]) != -1) {
            isSamsung = true;
            break;
        }
    }

    return isSamsung;
};

UserAgent.isIPhone4 = function () {
    var isIPhone4 = false;

    if (UserAgent.isSafari()) {
        var iHeight = window.screen.availHeight;
        if (iHeight < 500) {
            isIPhone4 = true;
        }
    }

    return isIPhone4;
};

UserAgent.isSafariIOS7 = function () {
    return navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i) != null;
};

/**
 * Checks to see if the browser is iOS7 safari with the bottom and top bars showing
 */
UserAgent.isCrampedSafari = function () {
    if (UserAgent.isSafariIOS7()) {
        if ((window.orientation == 90 || window.orientation == -90) && window.innerHeight < 270) {
            return true;
        }
    }

    return false;
};
