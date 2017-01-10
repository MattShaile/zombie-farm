goog.provide('com.epic.common.util.Bitmap9Slice');

goog.require('com.epic.common.util.StageSetup');
goog.require('com.epic.common.util.UserAgent');


/**
 * Utility for creating and controlling a 9 slice bitmap with easel js
 * @param source {Bitmap}
 * @param slices {Rectangle}
 * @constructor
 */
function Bitmap9Slice(source, slices) {
    createjs.EventDispatcher.initialize(this);

    this.slices = slices;

    this.bmp = source;
    this.clip = new createjs.Container();

    this.width = this.bmp.image.width;
    this.height = this.bmp.image.height;

    var inst = this;

    StageSetup.cachesInProgress++;

    // See tired rant below
    this.tryDraw = function () {
        inst.draw();
    };

    this.draw();
}

/**
 * Draw the 9 slice bitmap
 */
Bitmap9Slice.prototype.draw = function () {
    /**
     * If you've come this far you're probably wondering, "Why the heck are you checking if the image is complete
     * when the preloader has already successfully completed, then checking it again every 100ms until it is?!".
     * Well, normally your confusion would be justified; a loaded image -should- be just that: loaded!
     * Welcome to my world of pain. It is a world where a certain device decides it doesn't agree the image is loaded,
     * and won't let you manipulate the data such as a clone or a source rect change. I won't say the device name,
     * but let's just say it's named after a fruit. If you have any complaints about this needless, over-engineered
     * fix then please address them to complaints@apple.com
     */
    if (!this.bmp.image.complete) {
        setTimeout(this.tryDraw, 1000);
        return;
    }

    StageSetup.cachesInProgress--;

    var rightWidth = this.bmp.image.width - ( this.slices.x + this.slices.width);
    var bottomHeight = this.bmp.image.height - ( this.slices.y + this.slices.height);

    this.upperLeft = this.createSlice(this.bmp, new createjs.Rectangle(0, 0, this.slices.x, this.slices.y));
    this.upperMiddle = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x, 0, this.slices.width, this.slices.y));
    this.upperRight = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x + this.slices.width, 0, rightWidth, this.slices.y));

    this.middleLeft = this.createSlice(this.bmp, new createjs.Rectangle(0, this.slices.y, this.slices.x, this.slices.height));
    this.middleMiddle = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x, this.slices.y, this.slices.width, this.slices.height));
    this.middleRight = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x + this.slices.width, this.slices.y, rightWidth, this.slices.height));

    this.bottomLeft = this.createSlice(this.bmp, new createjs.Rectangle(0, this.slices.y + this.slices.height, this.slices.x, bottomHeight));
    this.bottomMiddle = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x, this.slices.y + this.slices.height, this.slices.width, bottomHeight));
    this.bottomRight = this.createSlice(this.bmp, new createjs.Rectangle(this.slices.x + this.slices.width, this.slices.y + this.slices.height, rightWidth, bottomHeight));

    this.clip.addChild(this.upperLeft);
    this.clip.addChild(this.upperMiddle);
    this.clip.addChild(this.upperRight);
    this.clip.addChild(this.middleLeft);
    this.clip.addChild(this.middleMiddle);
    this.clip.addChild(this.middleRight);
    this.clip.addChild(this.bottomLeft);
    this.clip.addChild(this.bottomMiddle);
    this.clip.addChild(this.bottomRight);

    this.setSize(this.width, this.height);
};

Bitmap9Slice.prototype.createSlice = function (bmp, sliceRect) {
    var sliceBmp = bmp.clone();

    sliceBmp.sourceRect = new createjs.Rectangle(sliceRect.x, sliceRect.y, sliceRect.width, sliceRect.height);

    return sliceBmp;
};

Bitmap9Slice.prototype.getClip = function () {
    return this.clip;
};

Bitmap9Slice.prototype.setSize = function (width, height) {
    if (!this.bmp.image.complete) {
        this.width = width;
        this.height = height;
        return;
    }

    var totalWidth = width;
    var totalHeight = height;

    width -= (this.middleLeft.sourceRect.width + this.middleRight.sourceRect.width);
    height -= (this.upperMiddle.sourceRect.height + this.bottomMiddle.sourceRect.height);

    // resize
    this.upperMiddle.scaleX = this.middleMiddle.scaleX = this.bottomMiddle.scaleX = width / this.slices.width;
    this.middleLeft.scaleY = this.middleMiddle.scaleY = this.middleRight.scaleY = height / this.slices.height;

    // Detect iPhone devices and add an offset for no apparent reason so there aren't gaps in the 9 slice
    var iphoneFixOffset = 0;
    if (UserAgent.isSafari()) {
        //iphoneFixOffset = 1;
    }

    // place
    this.upperLeft.x = this.middleLeft.x = this.bottomLeft.x = 0;
    this.upperMiddle.x = this.middleMiddle.x = this.bottomMiddle.x = this.slices.x - iphoneFixOffset;
    this.upperRight.x = this.middleRight.x = this.bottomRight.x = this.slices.x + width - iphoneFixOffset * 2;

    this.upperLeft.y = this.upperMiddle.y = this.upperRight.y = 0;
    this.middleLeft.y = this.middleMiddle.y = this.middleRight.y = this.slices.y - iphoneFixOffset;
    this.bottomLeft.y = this.bottomMiddle.y = this.bottomRight.y = this.slices.y + height - iphoneFixOffset * 2;

    this.clip.uncache();
    this.clip.cache(0, 0, totalWidth, totalHeight);
};


