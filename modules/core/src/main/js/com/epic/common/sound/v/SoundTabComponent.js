goog.provide('com.epic.common.sound.v.SoundTabComponent');

goog.require('com.epic.common.util.Utils');


/**
 * Sound tab component
 * @constructor
 */
function SoundTabComponent(skin, toggleButton) {
    createjs.EventDispatcher.initialize(SoundTabComponent.prototype);

    this.skin = skin;

    this.toggleButton = toggleButton;

    this.toggleButton.addEventListener("change", this);
}

/**
 * Standard event handler function
 * @param event
 */
SoundTabComponent.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "change":
            this.dispatchEvent(event);
            break;
    }
};

/**
 * Hides / shows the tab
 * @param {boolean} enabled
 */
SoundTabComponent.prototype.setVisible = function (visible) {
    this.skin.setProperty("visible", visible);
};


SoundTabComponent.prototype.setMute = function (mute) {
    this.toggleButton.setToggled(mute);
};

/**
 * Destroys the component
 */
SoundTabComponent.prototype.destroy = function () {
    this.skin.destroy();

    Utils.clearObject(this);
};