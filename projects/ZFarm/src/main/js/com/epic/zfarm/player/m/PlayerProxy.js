goog.provide('com.epic.zfarm.player.m.PlayerProxy');

goog.require('com.epic.zfarm.player.note.PlayerNoteBody');
goog.require('com.epic.common.util.event.TimerEvent');
goog.require('com.epic.common.util.Timer');


function PlayerProxy() {
    var dataObject = {
        "cooldownTimer": null,
        "canShoot": false
    };

    puremvc.Proxy.call(this, PlayerProxy.NAME, dataObject);

    // Close scope functions
    var inst = this;

    this.fireCooldownCompleteHandler = function (e) {
        inst.fireCooldownComplete(e);
    }
}

goog.inherits(PlayerProxy, puremvc.Proxy);

PlayerProxy.NAME = "PlayerProxy";

/**
 * @returns {boolean}
 */
PlayerProxy.prototype.isShooting = function () {
    return this.data.cooldownTimer != null;
};

/**
 * @returns {boolean}
 */
PlayerProxy.prototype.canShoot = function () {
    return this.data.canShoot;
};

/**
 * @param value {boolean}
 * @returns {boolean}
 */
PlayerProxy.prototype.setReadyToShoot = function (value) {
    this.data.canShoot = value;
};

/**
 * @param cropIndex {Number}
 */
PlayerProxy.prototype.startShooting = function () {
    /**
     * @type {Timer}
     */
    var timer = this.data.cooldownTimer;

    this.stopShooting();

    timer = new Timer(750, 1000000);

    this.data.cooldownTimer = timer;

    timer.addEventListener(TimerEvent.CHANGE, this.fireCooldownCompleteHandler);

    timer.start();
};


PlayerProxy.prototype.stopShooting = function () {
    /**
     * @type {Timer}
     */
    var timer = this.data.cooldownTimer;

    if (timer) {
        timer.removeEventListener(TimerEvent.CHANGE, this.fireCooldownCompleteHandler);

        timer.stop();

        this.data.cooldownTimer = null;
    }
};

/**
 * @param e {TimerEvent}
 */
PlayerProxy.prototype.fireCooldownComplete = function (e) {
    this.facade.sendNotification(PlayerNoteBody.WHEN_FIRE_READY, new PlayerNoteBody());
};