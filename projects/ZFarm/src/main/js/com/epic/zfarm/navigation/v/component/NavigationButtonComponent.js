goog.provide('com.epic.zfarm.navigation.v.component.NavigationButtonComponent');

goog.require('com.epic.zfarm.navigation.v.event.NavigationEvent');
goog.require('com.epic.zfarm.navigation.v.skin.FarmButtonSkin');
goog.require('com.epic.zfarm.navigation.v.skin.GrannyButtonSkin');
goog.require('com.epic.common.ui.toggle.v.ToggleButtonComponent');
goog.require('com.epic.common.util.StageSetup');


/**
 * @param toggleButton {ToggleButtonComponent}
 * @param container {createjs.Container}
 * @param grannyButtonSkin {GrannyButtonSkin}
 * @param farmButtonSkin {FarmButtonSkin}
 * @constructor
 */
function NavigationButtonComponent(toggleButton, container, grannyButtonSkin, farmButtonSkin) {
    createjs.EventDispatcher.initialize(NavigationButtonComponent.prototype);

    /**
     * @type {createjs.Container}
     */
    this.container = container;

    /**
     * @type {ToggleButtonComponent}
     */
    this.toggleButton = toggleButton;

    /**
     * @type {GrannyButtonSkin}
     */
    this.grannyButtonSkin = grannyButtonSkin;

    /**
     * @type {FarmButtonSkin}
     */
    this.farmButtonSkin = farmButtonSkin;

    // Closure scope functions
    var inst = this;

    this.buttonToggledHandler = function (e) {
        inst.buttonToggled(e);
    }

    // Event listeners
    this.toggleButton.addEventListener("change", this.buttonToggledHandler);
};

/**
 * @param e
 */
NavigationButtonComponent.prototype.buttonToggled = function (e) {
    var inst = this;

    var targetX = 0;
    if (this.toggleButton.toggled) {
        targetX = -StageSetup.stage.canvas.width;
    }

    this.dispatchEvent(new NavigationEvent(NavigationEvent.EVENT_SCROLL_STARTED, this, this.toggleButton.toggled));

    createjs.Tween.get(this.container, {"override": true, "useTicks": true})
        .to({"x": targetX}, 30, createjs.Ease.sineInOut)
        .call(function () {
            inst.dispatchEvent(new NavigationEvent(NavigationEvent.EVENT_SCROLL_COMPLETE, inst, inst.toggleButton.toggled))
        });
};

/**
 * @param enabled {Boolean}
 */
NavigationButtonComponent.prototype.setEnabled = function (enabled) {
    this.toggleButton.setVisible(enabled);
};

/**
 * @param numDry    {Number}
 */
NavigationButtonComponent.prototype.setNumDry = function (numDry) {
    this.farmButtonSkin.setProperty(FarmButtonSkin.PROPERTY_NUM_DRY_CROPS, numDry);
};