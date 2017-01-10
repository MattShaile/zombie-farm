goog.provide('com.epic.zfarm.navigation.m.NavigationProxy');




function NavigationProxy() {
    var dataObject = {
        "currentScreen": ""
    };

    puremvc.Proxy.call(this, NavigationProxy.NAME, dataObject);
}

goog.inherits(NavigationProxy, puremvc.Proxy);

NavigationProxy.NAME = "NavigationProxy";

/**
 * @param value {String}
 */
NavigationProxy.prototype.setCurrentScreen = function (value) {
    this.data.currentScreen = value;
};

/**
 * @returns {String}
 */
NavigationProxy.prototype.getCurrentScreen = function () {
    return this.data.currentScreen;
};