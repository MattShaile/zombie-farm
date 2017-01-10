goog.provide('com.epic.common.ui.confirm.v.ConfirmComponent');

goog.require('com.epic.common.sound.SoundManager');


/**
 * @constructor
 */
function ConfirmComponent(okButton, cancelButton, containerSkin) {
    var inst = this;

    createjs.EventDispatcher.initialize(ConfirmComponent.prototype);

    this.containerSkin = containerSkin;

    this.okButton = okButton;
    this.cancelButton = cancelButton;

    this.okButtonHandler = function () {
        inst.okPressed();
    };

    this.cancelButtonHandler = function () {
        inst.cancelPressed();
    };

    this.okButton.addEventListener("click", this.okButtonHandler);
    if (this.cancelButton) {
        this.cancelButton.addEventListener("click", this.cancelButtonHandler);
    }
};

ConfirmComponent.prototype.setText = function (text) {
    this.containerSkin.setProperty("text", text);
};

ConfirmComponent.prototype.okPressed = function () {
    this.dispatchEvent({"type": "ok", "target": this});
};

ConfirmComponent.prototype.cancelPressed = function () {
    this.dispatchEvent({"type": "cancel", "target": this});
};

ConfirmComponent.prototype.setVisible = function (visible) {
    if (this.containerSkin) {

        this.containerSkin.addToContainer(this.containerSkin.getParentContainer());

        this.containerSkin.setProperty("visible", visible);
        if (!visible) {
            this.setText("");
        } else {
            SoundManager.getInstance().stopAllSounds();
        }
    }
};