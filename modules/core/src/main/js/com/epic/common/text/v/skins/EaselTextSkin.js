goog.provide('com.epic.common.text.v.skins.EaselTextSkin');

goog.require('com.epic.common.core.v.skins.EaselSkin');
goog.require('com.epic.common.core.v.skins.ISkin');
goog.require('com.epic.common.sound.SoundManager');
goog.require('com.epic.common.util.Currency');
goog.require('com.epic.common.util.StageSetup');
goog.require('com.epic.common.util.UserAgent');
goog.require('com.epic.common.util.Utils');


/**
 * Simple text skin. Used for all single text instances
 * @constructor
 * @implements {ISkin}
 */
function EaselTextSkin() {
    goog.base(this, null);

    this.debug = false;

    var inst = this;

    this.container.tf = new createjs.Text("", "20px Arial", "#ff7700");
    this.container.tf.textAlign = "center";
    this.container.tf.textBaseline = "middle";

    this.container.addChild(this.container.tf);

    if (this.debug) {
        this.boundsClip = new createjs.Shape();
        this.container.addChild(this.boundsClip);
    }

    this.cacheTimer;
    this.cacheHandler = function () {
        inst.cache();
    }
    this.cacheHandler();

    /**
     * Previous value for tickers
     * @type {number}
     */
    this.previousValue = 0;

    /**
     * Currently displayed tick value
     * @type {number}
     */
    this.tickValue = 0;

    /**
     * Updates the text field on ticking text
     */
    this.updateTickTextHandler = function () {
        inst.previousValue = Math.round(inst.tickValue);
        inst.setProperty("text", inst.previousValue);
    }
}

goog.inherits(EaselTextSkin, EaselSkin);

/**
 * Allows you to set any property directly onto the text field
 * @param name  Property name
 * @param value Property value
 */
EaselTextSkin.prototype.setProperty = function (name, value) {
    if (name == "x" || name == "y" || name == "scaleX" || name == "scaleY" || name == "currency" || name == "tickUpTime") {
        switch (name) {
            case "x":
                this.container.x = value;
                break;
            case "y":
                this.container.y = value;
                break;
            case "scaleX":
                this.container.scaleX = value;
                break;
            case "scaleY":
                this.container.scaleY = value;
                break;
            case "currency":
                this.currency = value;
                break;
            // A time in frames describing how long a value takes to tick up to
            case "tickUpTime":
                this.tickUpTime = value;
                break;
        }
        return;
    }

    // Value ticking
    if (name == "text") {
        if (this.tickUpTime > 0 && this.previousValue < parseInt(value)) {

            createjs.Tween.removeTweens(this);
            createjs.Tween.get(this, {"useTicks": true})
                .to({"tickValue": parseInt(value)}, this.tickUpTime)
                .call(function () {
                    SoundManager.getInstance().getSound("TickSound").stop();
                })
                .addEventListener("change", this.updateTickTextHandler);

            SoundManager.getInstance().getSound("TickSound").play();

            this.previousValue = parseInt(value);

            return;
        } else {
            this.previousValue = this.tickValue = parseInt(value);
        }

        if (this.currency) {
            value = Currency.format(value);
        }
    }

    if (name == "stroke") {
        var thickness = parseInt(value.split("px")[0]);
        var color = value.split(" ")[1];

        if (thickness <= 0) {
            if (this.container.strokeTf) {
                this.container.removeChild(this.container.strokeTf);
                this.container.strokeTf = null;
            }
        } else {
            if (!this.container.strokeTf) {

                this.container.strokeTf = this.container.tf.clone();

                this.container.addChild(this.container.strokeTf);
                this.container.addChild(this.container.tf);
            }

            this.container.strokeTf.color = color;
            this.container.strokeTf.outline = thickness;
        }
    } else if (name == "knockout") {
        this.container.tf.visible = !value;
    }

    this.container.tf[name] = value;
    if (this.container.strokeTf && name != "color" && name != "knockout") {
        this.container.strokeTf[name] = value;
    }

    // Caching text fills up memory quickly, turned off for Android text disappearing bug
    // Safari and Chrome however benefit from caching text and don't seem to fall to bits
    // unlike Android stock. HTML5/js is great isn't it? The usual BORING predictability of
    // programming is much more dull. Coding in JS for HTML5 is like a box of chocolates,
    // you never know what you're gonna get!
    if (UserAgent.isSafari() || UserAgent.isChrome()) {
        Utils.clearFrameTimeout(this.cacheTimer);
        this.cacheTimer = Utils.setFrameTimeout(this.cacheHandler, 1000 / StageSetup.fps);
    }
};

EaselTextSkin.prototype.getProperty = function (name) {
    goog.base(this, "getProperty", name);

    switch (name) {
        case "measuredLineHeight":
            return this.container.tf.getMeasuredLineHeight();
            break;
    }
};

EaselTextSkin.prototype.cache = function () {
    if (this.container) {
        this.container.uncache();

        if (this.debug) {
            var boundsObj = this.container.tf.getBounds();
            if (boundsObj) {
                var txt = this.container.tf.text;
                this.container.tf.text = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

                var boundsObj = this.container.tf.getBounds();
                this.boundsClip.graphics.clear();
                this.boundsClip.graphics.setStrokeStyle(2).beginStroke("#f00").drawRect(boundsObj.x, boundsObj.y, boundsObj.width, boundsObj.height);

                this.container.tf.text = txt;
            }
        } else {

            var bounds = this.container.getBounds();

            if (bounds) {
                this.container.cache(bounds.x - 20, bounds.y - 20, bounds.width + 40, bounds.height + 40, 1);
            }
        }
    }
};

/**
 * Cleans up the component and removes it from parent if applicable
 */
EaselTextSkin.prototype.destroy = function () {
    this.container.removeChild(this.container.strokeTf);
    this.container.removeChild(this.container.tf);

    clearTimeout(this.cacheTimer);
    this.container.uncache();

    goog.base(this, "destroy");
};