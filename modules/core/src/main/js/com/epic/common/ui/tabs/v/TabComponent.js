goog.provide('com.epic.common.ui.tabs.v.TabComponent');




/**
 * @constructor
 */
function TabComponent() {
    createjs.EventDispatcher.initialize(TabComponent.prototype);
}

/**
 * Initializes the tab component
 * @param buttons {Array}   Array of buttons
 * @param names {Array}     Array of tab names
 */
TabComponent.prototype.init = function (buttons, names) {
    var inst = this;

    this.buttons = buttons;
    this.names = names;

    var button;

    this.tabClickedHandler = function (event) {
        inst.tabClicked(event);
    };

    for (var i = 0; i < this.buttons.length; i++) {
        button = this.buttons[i];
        button.addEventListener("click", this.tabClickedHandler);
    }

    this.setVisible(false);
};

/**
 * Handles when a tab is clicked. Dispatched change event
 * @param event
 */
TabComponent.prototype.tabClicked = function (event) {
    for (var i = 0; i < this.buttons.length; i++) {
        if (this.buttons[i] == event.target) {
            this.dispatchEvent({"type": "change", "target": this, "tabName": this.names[i]});
            this.setTab(this.names[i]);
            break;
        }
    }
};

/**
 * Sets a specified tab to be the selected tab based on name
 * @param name {String}     The name of the selected tab
 */
TabComponent.prototype.setTab = function (name) {
    for (var i = 0; i < this.names.length; i++) {
        if (this.names[i] == name) {
            this.buttons[i].setEnabled(false);
        } else {
            this.buttons[i].setEnabled(true);
        }
    }
};

/**
 * Sets the first tab as the selected tab
 */
TabComponent.prototype.resetTab = function () {
    for (var i = 0; i < this.buttons.length; i++) {
        if (i == 0) {
            this.buttons[i].setEnabled(false);
        } else {
            this.buttons[i].setEnabled(true);
        }
    }
};

/**
 * Hides / shows the tabs
 * @param visible {Boolean}
 */
TabComponent.prototype.setVisible = function (visible) {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].setVisible(visible);
    }
};