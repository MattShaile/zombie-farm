goog.provide('com.epic.common.screen.v.ScreenComponent');

goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.screen.m.ScreenConstants');
goog.require('com.epic.common.util.StageSetup');
goog.require('com.epic.common.util.UserAgent');


/**
 * Handles screen events such as resize and orientation change
 * @param {ISkin} skin  The rotate prompt skin
 * @param {Number} nativeWidth  The native width of the application
 * @param {Number} nativeHeight The native height of the application
 * @param {Boolean} [showPrompt]    Whether to keep the game landscape regardless of orientation or to display a rotate prompt in portrait
 * @constructor
 */
function ScreenComponent(skin, nativeWidth, nativeHeight, showPrompt) {
    if (typeof(showPrompt) === 'undefined') showPrompt = true;

    var inst = this;

    this.initialized = false;

    this.showPrompt = showPrompt;

    this.skin = skin;

    this.nativeWidth = nativeWidth;
    this.nativeHeight = nativeHeight;

    this.gameMode = ScreenConstants.PRELOAD_MODE;

    this.canvasElement = StageSetup.canvas;

    if (UserAgent.isAndroid()) {
        this.canvasElement.style.opacity = 0.99;
        setTimeout(function () {
            inst.canvasElement.style.opacity = 1;
        }, 0);
    }

    this.backgroundElement = document.getElementById("bg");

    this.skin.setProperty("x", nativeHeight / 2);
    this.skin.setProperty("y", nativeWidth / 2);

    this.resized = true;
    this.allowScroll = false;

    this.lastResizeWidth = 0;
    this.lastResizeHeight = 0;

    this.resizeEventHandler = function () {
        if (Math.abs(inst.lastResizeWidth - window.innerWidth) > 10 || Math.abs(inst.lastResizeHeight - window.innerHeight) > 10) {
            inst.lastResizeWidth = window.innerWidth;
            inst.lastResizeHeight = window.innerHeight;
            inst.resized = true;
        }
    };
    window.addEventListener("resize", this.resizeEventHandler);

    this.hideTopBarInterval = setInterval(function () {
        inst.update();
    }, 1000);

    document.addEventListener("touchmove", function (e) {
        if (!inst.allowScroll) {
            e.preventDefault()
        }
    }, false);

    document.body.onselectstart = function () {
        return false;
    };

    this.update();
}

/**
 * This is the maximum supported width of the background image to cater for wide screen. The background image should always be of this size
 * @type {number}
 */
ScreenComponent.MAX_WIDTH = 1400;

ScreenComponent.prototype.init = function () {
    this.resized = true;
    this.resizeEventHandler();

    this.initialized = true;
    this.skin.init();
};

/**
 * Resizes and re-orients the canvas. Hides the game containers and shows the prompt if applicable
 */
ScreenComponent.prototype.resize = function () {
    StageSetup.delayDraw = true;

    var portrait = false;

    var targetWidth = this.nativeWidth;
    var targetHeight = this.nativeHeight;

    var scaleSize;

    if (window.innerHeight > window.innerWidth) {
        portrait = true;
        if (this.showPrompt && this.gameMode == ScreenConstants.GAME_MODE) {
            targetWidth = this.nativeHeight;
            targetHeight = this.nativeWidth;
            scaleSize = Math.min(window.innerWidth / targetWidth, window.innerHeight / targetHeight);
        } else {
            scaleSize = Math.min(window.innerWidth / this.nativeHeight, window.innerHeight / this.nativeWidth);
        }
    } else {
        scaleSize = Math.min(window.innerWidth / targetWidth, window.innerHeight / targetHeight);
    }

    // Resize the background
    var bgWidthScale = ScreenComponent.MAX_WIDTH / this.nativeWidth;

    if (this.backgroundElement) {
        this.backgroundElement.style.width = (targetWidth * scaleSize * bgWidthScale) + "px";
        this.backgroundElement.style.height = (targetHeight * scaleSize) + "px";
        this.backgroundElement.style.left = ((window.innerWidth - (targetWidth * scaleSize * bgWidthScale)) / 2) + "px";
        this.backgroundElement.style.top = ((window.innerHeight - (targetHeight * scaleSize)) / 2) + "px";
    }

    // Resize the main canvas
    this.canvasElement.width = targetWidth;
    this.canvasElement.height = targetHeight;
    this.canvasElement.style.width = (targetWidth * scaleSize) + "px";
    this.canvasElement.style.height = (targetHeight * scaleSize) + "px";
    this.canvasElement.style.marginLeft = ((window.innerWidth - (targetWidth * scaleSize)) / 2) + "px";
    this.canvasElement.style.marginTop = ((window.innerHeight - (targetHeight * scaleSize)) / 2) + "px";
    this.canvasElement.style.rotationPoint = "50% 50%";


    if (portrait && this.gameMode == ScreenConstants.GAME_MODE) {
        if (this.showPrompt) {
            if (this.backgroundElement) {
                this.backgroundElement.style.visibility = "hidden";
            }
            StageSetup.landscapeContainer.visible = false;
            StageSetup.portraitContainer.visible = true;

            if (this.initialized) {
                this.skin.changeState("visible");
            }
        } else {
            if (this.backgroundElement) {
                this.backgroundElement.style.transform = "rotate(90deg)";
                this.backgroundElement.style.webkitTransform = "rotate(90deg)";
                this.backgroundElement.style.msTransform = "rotate(90deg)";
            }
            this.canvasElement.style.transform = "rotate(90deg)";
            this.canvasElement.style.webkitTransform = "rotate(90deg)";
            this.canvasElement.style.msTransform = "rotate(90deg)";
        }
    } else {
        if (this.backgroundElement) {
            this.backgroundElement.style.visibility = "visible";
        }
        if (this.showPrompt) {
            StageSetup.landscapeContainer.visible = true;
            StageSetup.portraitContainer.visible = false;
            if (this.initialized) {
                this.skin.changeState("hidden");
            }
        } else {
            if (this.backgroundElement) {
                this.backgroundElement.style.transform = "rotate(0deg)";
                this.backgroundElement.style.webkitTransform = "rotate(0deg)";
                this.backgroundElement.style.msTransform = "rotate(0deg)";
            }
            this.canvasElement.style.transform = "rotate(0deg)";
            this.canvasElement.style.webkitTransform = "rotate(0deg)";
            this.canvasElement.style.msTransform = "rotate(0deg)";
        }
    }

    StageSetup.stage.update();
};

/**
 * Called on an interval, scrolls the screen to the top and calls resize if there has been a change in screen size / orientation
 */
ScreenComponent.prototype.update = function () {
    var scrollPrompt = document.getElementById("scrollPrompt");

    if (UserAgent.isCrampedSafari()) {
        this.allowScroll = true;
        scrollPrompt.style.visibility = "visible";
    } else if (this.allowScroll) {
        this.allowScroll = false;
        scrollPrompt.style.visibility = "hidden";
        this.resized = true;
    }

    if (this.resized) {
        this.resized = false;

        // If viewport has been cleared add it again
        StageSetup.addViewPortMeta();

        this.resize();
    }

    window.scrollTo(0, UserAgent.isSafari() ? 1 : 0);
};

/**
 * Sets the mode of the screen component to behave differently on orientation events
 * @param mode {String}
 */
ScreenComponent.prototype.setMode = function (mode) {
    this.gameMode = mode;
};


/**
 * Switches the background image
 */
ScreenComponent.prototype.switchBackground = function (src) {
    if (this.backgroundElement) {

        var children = this.backgroundElement.getElementsByTagName('img');
        var fixedChildren = [];

        var i, e;
        for (i = 0; i < children.length; ++i) {
            e = children[i];
            fixedChildren.push(e);
        }

        for (i = 0; i < fixedChildren.length; ++i) {
            e = fixedChildren[i];

            e.style.visibility = e.id == src ? "inherit" : "hidden";

            if (e.id != src) {
                this.backgroundElement.appendChild(e);
            }
        }
    }
};

/**
 * Destroys the skin contained within this component. Clears any intervals and removes event listeners
 */
ScreenComponent.prototype.destroy = function () {
    clearInterval(this.hideTopBarInterval);

    window.removeEventListener("resize", this.resizeEventHandler);

    this.hideTopBarInterval = null;
    this.resizeEventHandler = null;

    if (this.initialized) {
        this.skin.destroy();
    }
};