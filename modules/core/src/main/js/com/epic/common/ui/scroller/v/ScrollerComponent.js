goog.provide('com.epic.common.ui.scroller.v.ScrollerComponent');




/**
 * @constructor
 */
function ScrollerComponent(topY, bottomY, targetSkin) {
    var inst = this;

    createjs.EventDispatcher.initialize(ScrollerComponent.prototype);

    this.topY = topY;
    this.bottomY = bottomY;

    this.targetSkin = targetSkin;

    this.lastY = 0;
    this.position = 0;
    this.scrollSpeed = 0;
    this.flickSpeed = 0;
    this.touchY = 0;

    this.targetSkin.getEventDispatcher().addEventListener("mousedown", this);
    this.targetSkin.getEventDispatcher().addEventListener("pressmove", this);
    this.targetSkin.getEventDispatcher().addEventListener("pressup", this);

    // Should be frame based
    this.tickHandler = function () {
        inst.updatePosition();
    };
    setInterval(this.tickHandler, 30);
}

ScrollerComponent.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "mousedown":
            this.sliding = true;
            this.scrollSpeed = 0;
            this.lastY = this.touchY = event.stageY;
            break;
        case "pressmove":
            this.touchY = event.stageY;
            break;
        case "pressup":
            this.sliding = false;
            break;
    }
};

ScrollerComponent.prototype.updatePosition = function () {
    if (this.lastY != this.touchY) {
        this.scrollSpeed = this.lastY - this.touchY;
        this.lastY = this.touchY;
    }

    var newPosition = this.position - this.scrollSpeed;

    if (newPosition < this.topY) {
        this.position = this.topY;
        this.scrollSpeed = 0;
    } else if (newPosition > this.bottomY) {
        this.position = this.bottomY;
        this.scrollSpeed = 0;
    } else {
        this.position = newPosition;
    }

    this.targetSkin.setProperty("scrollY", this.position);

    this.scrollSpeed *= 0.9;
    if (Math.abs(this.scrollSpeed) < 2) {
        this.scrollSpeed = 0;
    }
};

