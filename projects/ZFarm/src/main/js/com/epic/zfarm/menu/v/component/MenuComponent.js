goog.provide('com.epic.zfarm.menu.v.component.MenuComponent');

goog.require('com.epic.zfarm.menu.v.event.MenuEvent');
goog.require('com.epic.common.ui.button.v.ButtonComponent');
goog.require('com.epic.common.util.Utils');


/**
 * @param playButton {ButtonComponent}
 * @constructor
 */
function MenuComponent(playButton) {
    createjs.EventDispatcher.initialize(MenuComponent.prototype);

    /**
     * @type {ButtonComponent}
     */
    this.playButton = playButton;

    this.playButton.addEventListener("click", this);
};

MenuComponent.prototype.handleEvent = function (e) {
    switch (e.type) {
        case "click":
            this.playClicked();
            break;
    }
};

MenuComponent.prototype.playClicked = function () {
    this.dispatchEvent(new MenuEvent(MenuEvent.EVENT_PLAY_CLICKED, this));
};

MenuComponent.prototype.destroy = function () {
    this.playButton.removeEventListener("click", this);

    this.playButton.destroy();

    Utils.clearObject(this);
};