goog.provide('com.epic.common.ui.toggle.v.ToggleButtonComponent');




/**
 * @constructor
 */
function ToggleButtonComponent(toggleOnButton, toggleOffButton) {
    var inst = this;

    createjs.EventDispatcher.initialize(ToggleButtonComponent.prototype);

    this.toggleOnButton = toggleOnButton;
    this.toggleOffButton = toggleOffButton;

    this.visible = true;
    this.toggled = false;
    this.update();

    this.toggleButtonHandler = function () {
        inst.setToggled();
    };

    this.toggleOnButton.addEventListener("click", this.toggleButtonHandler);
    this.toggleOffButton.addEventListener("click", this.toggleButtonHandler);
};

/**
 * Sets whether or not the button is toggled
 * @param [toggled] {Boolean}       If null then the current toggled state will be inverted
 */
ToggleButtonComponent.prototype.setToggled = function (toggled) {
    toggled = typeof toggled === "undefined" ? !this.toggled : toggled;

    this.toggled = toggled;
    this.update();

    this.dispatchEvent({"type": "change", "toggled": this.toggled});
};

/**
 * Updates the toggle button
 */
ToggleButtonComponent.prototype.update = function () {
    this.toggleOffButton.setVisible(this.toggled && this.visible);
    this.toggleOnButton.setVisible(!this.toggled && this.visible);
};

/**
 * Hides / shows the toggle button
 * @param visible {Boolean}
 */
ToggleButtonComponent.prototype.setVisible = function (visible) {
    this.visible = visible;

    this.update();
};