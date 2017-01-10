var CurrencyTest = new TestCase('CurrencyTest');

CurrencyTest.prototype.setUp = function () {
};

CurrencyTest.prototype.tearDown = function () {
};

CurrencyTest.prototype.test_format = function () {
    var format = new CurrencyFormat("GBP ", ",", ".", true, true);

    assertEquals("GBP 0.00", Currency.format(0, format));
    assertEquals("GBP 5.00", Currency.format(500, format));
    assertEquals("GBP 5.50", Currency.format(550, format));
    assertEquals("GBP 5.55", Currency.format(555, format));
    assertEquals("GBP 55.55", Currency.format(5555, format));
    assertEquals("GBP 555.55", Currency.format(55555, format));
    assertEquals("GBP 5,555.55", Currency.format(555555, format));

    format.thousandSeparator = "";

    assertEquals("GBP 5555.55", Currency.format(555555, format));

    format.thousandSeparator = ",";
    format.decimalSeparator = ".";
    format.showZeroDecimal = false;

    assertEquals("GBP 0", Currency.format(0, format));
    assertEquals("GBP 5", Currency.format(500, format));
    assertEquals("GBP 5.50", Currency.format(550, format));
    assertEquals("GBP 5.55", Currency.format(555, format));

    format.showZero = false;

    assertEquals("", Currency.format(0, format));
};

