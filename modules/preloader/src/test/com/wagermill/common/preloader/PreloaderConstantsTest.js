var PreloaderConstantsTest = new TestCase('PreloaderConstantsTest');

PreloaderConstantsTest.prototype.setUp = function () {
};

PreloaderConstantsTest.prototype.tearDown = function () {
};

PreloaderConstantsTest.prototype.test_constantNames = function () {
    var containsName = true;

    for (var i in PreloaderConstants) {
        if (PreloaderConstants[i].toLowerCase().indexOf("preloader") == -1) {
            containsName = false;
            break;
        }
    }

    assertEquals(true, containsName);
};