goog.provide('com.epic.common.error.m.ErrorProxy');




/**
 *
 * @extends {puremvc.Proxy}
 * @constructor
 */
function ErrorProxy() {
    var data = {
        "dismissNoteName": null,
        "dismissNoteBody": {}
    };
    puremvc.Proxy.call(this, ErrorProxy.NAME, data);
}

goog.inherits(ErrorProxy, puremvc.Proxy);

/**
 * Proxy NAME constant
 * @const
 * @type string
 */
ErrorProxy.NAME = "ErrorProxy";

ErrorProxy.prototype.getDismissNoteName = function () {
    return this.getData().dismissNoteName;
};

ErrorProxy.prototype.getDismissNoteBody = function () {
    return this.getData().dismissNoteBody;
};

ErrorProxy.prototype.setDismissNote = function (name, body) {
    this.getData().dismissNoteName = name;
    this.getData().dismissNoteBody = body;
};