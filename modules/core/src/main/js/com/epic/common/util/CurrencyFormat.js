goog.provide('com.epic.common.util.CurrencyFormat');




/**
 * Describes a currency format
 * @param prefix {String}   String to put at the beginning
 * @param thousandSeparator {String}    Character to put between thousands (1,000 for example)
 * @param decimalSeparator  {String}    Character to put before decimal places (1.00 for example)
 * @param showZero  {Boolean}   Show 0 as a blank string
 * @param showZeroDecimal   {Boolean}   Show 0 as 0.00
 * @constructor
 */
var CurrencyFormat = function (prefix, thousandSeparator, decimalSeparator, showZero, showZeroDecimal) {
    this.prefix = prefix;
    this.thousandSeparator = thousandSeparator;
    this.decimalSeparator = decimalSeparator;
    this.showZero = showZero;
    this.showZeroDecimal = showZeroDecimal;
};
