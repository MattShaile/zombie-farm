goog.provide('com.epic.common.util.StageSetup');

goog.require('com.epic.common.util.UserAgent');


/**
 * @class
 */
var StageSetup = {};

/**
 * Helper function to set up createjs Stage and set an update frame rate
 * @static
 */
StageSetup.init = function () {
    StageSetup.fpsField = document.getElementById("fps");

    StageSetup.addViewPortMeta();

    var canvas = document.getElementById("game");
    var stage = new createjs.Stage(canvas);
    stage.mouseChildren = true;
    stage.enableDOMEvents(true);
    stage.enableMouseOver(0);
    stage.snapToPixelEnabled = true;
    stage.tickEnabled = false;
    // stage.autoClear = false;

    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage, true);
    }

    var delayDrawTimeout;

    function handleTick(event) {
        if (StageSetup.fpsField) {
            StageSetup.currentFPS = Math.round(createjs.Ticker.getMeasuredFPS());
            StageSetup.fpsField.innerHTML = StageSetup.currentFPS + "fps";
        }

        if (!UserAgent.isSafari() && !UserAgent.isChrome()) {
            if (StageSetup.delayDraw) {
                stage.clear();

                setTimeout(function () {
                    StageSetup.delayDraw = false;
                }, 1000);
                return;
            }
        }

        stage.update();
    }

    var targetFPS = StageSetup.fps;

    // Only use for Safari and Chrome
    if (UserAgent.isSafari()) {
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        targetFPS += 5;
    }

    createjs.Ticker.setFPS(targetFPS);

    createjs.Ticker.addEventListener("tick", handleTick);

    StageSetup.stage = stage;
    StageSetup.canvas = canvas;
    StageSetup.context = StageSetup.canvas.getContext("2d");
    StageSetup.landscapeContainer = new createjs.Container();
    StageSetup.rootContainer = new createjs.Container();
    StageSetup.overlayContainer = new createjs.Container();
    StageSetup.portraitContainer = new createjs.Container();

    stage.addChild(StageSetup.landscapeContainer);
    StageSetup.landscapeContainer.addChild(StageSetup.rootContainer);
    StageSetup.landscapeContainer.addChild(StageSetup.overlayContainer);
    stage.addChild(StageSetup.portraitContainer);
};

/**
 * Target frame rate
 * @type {number}
 */
StageSetup.fps = 30;

/**
 * Current frame rate
 * @type {number}
 */
StageSetup.currentFPS = 0;

/**
 * @static
 * @type {*}
 */
StageSetup.stage = null;

/**
 * @static
 * @type {Boolean}
 */
StageSetup.gameLoaded = false;

/**
 * Root container for application content
 * @type {createjs.Container}
 */
StageSetup.rootContainer;
/**
 * Container which sits above the root container
 * @type {createjs.Container}
 */
StageSetup.overlayContainer;
/**
 * Container holding elements to be shown only during portrait mode
 * @type {createjs.Container}
 */
StageSetup.portraitContainer;

/**
 * Container holding elements to be shown only during landscape mode
 * @type {createjs.Container}
 */
StageSetup.landscapeContainer;

/**
 * Reference to the canvas
 * @type {*}
 */
StageSetup.canvas = null;

/**
 * The cnvas context
 * @type {*}
 */
StageSetup.context = null;

/**
 * A running count of how many images are waiting to be cached. This should added to when a cache begins,
 * then subtracted from when a cache is complete. This value should then be checked once all caches have
 * begun and when it reaches 0 the application should be initialized
 * @type {Number}
 */
StageSetup.cachesInProgress = 0;

/**
 * Sets the view port meta data
 */
StageSetup.addViewPortMeta = function () {
    var viewPortTag = document.getElementById("viewport");

    if (!viewPortTag) {
        var viewPortTag = document.createElement('meta');
        document.getElementsByTagName('head')[0].appendChild(viewPortTag);

        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=device-width,target-densitydpi=device-dpi,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no";
    }
};