goog.provide('com.epic.common.display.v.DepthManager');

goog.require('com.epic.common.core.v.skins.ISkin');


/**
 * Manages depths of clips
 * @constructor
 */
function DepthManager() {
    this.defaultParents = [];
    this.defaultDepthIndexes = [];
    this.skins = [];
}

/**
 * @private
 * @type {DepthManager}
 */
DepthManager.instance = null;

/**
 * Returns the DepthManager instance
 * @returns {DepthManager}
 */
DepthManager.getInstance = function () {
    if (!DepthManager.instance) {
        DepthManager.instance = new DepthManager();
    }

    return DepthManager.instance;
};

/**
 * Adds a skin to the register of available skins
 * @param id {String}   An ID to be used to reference the skin
 * @param skin {ISkin}  The skin
 */
DepthManager.prototype.addSkin = function (id, skin) {
    this.defaultParents[id] = skin.getParentContainer ? skin.getParentContainer() : skin.parent;
    this.skins[id] = skin;

    var skinContainer = skin.getContainer ? skin.getContainer() : skin;
    this.defaultDepthIndexes[id] = this.defaultParents[id].getChildIndex(skinContainer);
};

/**
 * Puts all specified skins into a specified container in the order specified (first element goes on top)
 * @param hierarchy {Array}     Array of skin id's
 * @param container {String}    ID of container to put skins in
 */
DepthManager.prototype.setHierarchy = function (hierarchy, container) {
    var i;

    var skinName;
    var containerSkin = this.skins[container];

    for (i = hierarchy.length - 1; i >= 0; i--) {
        skinName = hierarchy[i];
        this.changeContainer(this.skins[skinName], containerSkin);
    }
};

/**
 * Resets all skins back to where they were when they were registered with the manager
 */
DepthManager.prototype.resetHierarchy = function () {
    var i;
    var prop;

    var sortedProps = this.getOrderedSkins();

    for (i = 0; i < sortedProps.length; i++) {
        prop = sortedProps[i].prop;
        this.changeContainer(this.skins[prop], this.defaultParents[prop], this.defaultDepthIndexes[prop]);
    }
};

/**
 * Resets all skins within the specified skin back to where they were when they were registered with the manager
 * @param   skinName    The ID of the skin in which all it's children are reset
 */
DepthManager.prototype.resetHierarchyInSkin = function (skinName) {
    var i;
    var targetSkin = this.skins[skinName];

    var prop;

    var sortedProps = this.getOrderedSkins();

    for (i = 0; i < sortedProps.length; i++) {
        prop = sortedProps[i].prop;
        if (this.getParentSkin(this.skins[prop]) == targetSkin) {
            this.changeContainer(this.skins[prop], this.defaultParents[prop], this.defaultDepthIndexes[prop]);
        }
    }
};

//TODO: Remove createjs specific code?
/**
 * Moves a skin from it's current parent container to a specified container. Createjs only.
 * @private
 * @param skin {ISkin}  The skin to move
 * @param container {easeljs.Container} Destination container
 * @param [index=-1] {Number} the index in the target display list to add to. -1 = top
 */
DepthManager.prototype.changeContainer = function (skin, container, index) {
    index = typeof index !== 'undefined' ? index : -1;

    // The object we want to move
    var skinContainer = skin.getContainer ? skin.getContainer() : skin;

    // The object's current parent
    var skinParentContainer = this.getParentSkin(skin);

    // The target parent
    container = container.getContainer ? container.getContainer() : container;

    var p = skinParentContainer.localToLocal(skinContainer.x, skinContainer.y, container);

    if (skin.addToContainer) {
        skin.addToContainer(container, index);
    } else {
        if (index > -1 && index <= container.getNumChildren()) {
            container.addChildAt(skinContainer, index);

        } else {
            container.addChild(skinContainer);
        }
    }

    skinContainer.x = p.x;
    skinContainer.y = p.y;
};

/**
 * Gets the parent container of the skin
 * @param skin
 * @returns {createjs.Container}
 */
DepthManager.prototype.getParentSkin = function (skin) {
    return skin.getParentContainer ? skin.getParentContainer() : skin.parent;
};

/**
 * Get the keys in order of defaultDepthIndexes to make sure the depths are added correctly to the hierarchy from bottom to top
 * @returns {Array}
 */
DepthManager.prototype.getOrderedSkins = function () {
    var sortedProps = [];

    var prop;
    for (prop in this.defaultDepthIndexes) {
        sortedProps.push({"prop": prop, "index": this.defaultDepthIndexes[prop]});
    }

    sortedProps.sort(function (a, b) {
        return a.index - b.index;
    });

    return sortedProps;
};