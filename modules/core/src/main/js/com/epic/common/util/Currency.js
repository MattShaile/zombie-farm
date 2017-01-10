goog.provide('com.epic.common.util.Currency');

goog.require('com.epic.common.util.CurrencyFormat');


/**
 * @class
 */
var Currency = {};

/**
 * Formats a value (in 'pence') to a currency string based on the format (or default format)
 * @static
 * @param value {Number}    Value to convert
 * @param [format] {CurrencyFormat}   Currency format rules
 * @returns {string}
 */
Currency.format = function (value, format) {
    format = typeof format !== 'undefined' ? format : Currency.defaultFormat;

    // Divide 'pence' value to give 'pound' value
    var result = (value / 100).toString();

    // Cut off any decimals in case we're passed an int suffering from a bad case of the floating point error
    var decimalPlace = result.indexOf(".");

    if (decimalPlace != -1) {
        // Three decimals, somethings gone wrong
        if (result.length > decimalPlace + 3) {
            // Check if we're going down or up
            if (result.charAt(decimalPlace + 3) == "0") {
                // Cut the decimals off
                result = result.substring(0, decimalPlace + 3);
            } else {
                // You really are in a world of pain...
                // Okay be cool, we just need need to add 0.01
                // to the original value then lop of the decimals as above
                value += 0.01;
                result = (value / 100).toString();
                result = result.substring(0, decimalPlace + 3);

            }
        }
    }

    // Change decimal separator
    result = result.split(".").join(format.decimalSeparator);

    // Make sure correct amount of decimal numbers are shown, hide when 0
    var decimalIndex = result.indexOf(format.decimalSeparator);

    if (result == "0" && !format.showZero) {
        result = "";
    } else if (decimalIndex != -1 && decimalIndex == result.length - 2) {
        result += "0";
    }

    // Add trailing decimal 0's
    if (result.indexOf(format.decimalSeparator) == -1 && format.showZeroDecimal) {
        result += format.decimalSeparator + "00";
    }

    // Add thousand separators
    var checkIndex = result.indexOf(format.decimalSeparator);
    if (checkIndex == -1) {
        checkIndex = result.length;
    }

    while (checkIndex > 0) {
        checkIndex -= 3;
        if (checkIndex > 0) {
            result = result.slice(0, checkIndex) + format.thousandSeparator + result.slice(checkIndex, result.length);
        }
    }

    // Add currency prefix
    if (result != "") {
        result = format.prefix + result;
    }

    return result;
};

/**
 * Default CurrencyFormat rules
 * @type {CurrencyFormat}
 */
Currency.defaultFormat = new CurrencyFormat("", ",", ".", true, true);