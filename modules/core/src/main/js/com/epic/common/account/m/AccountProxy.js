goog.provide('com.epic.common.account.m.AccountProxy');




/**
 * Proxy containing information about the users account such as balance
 *
 * @extends {puremvc.Proxy}
 * @constructor
 */
function AccountProxy() {
    var data = {
        "balance": []
    };
    puremvc.Proxy.call(this, AccountProxy.NAME, data);
}

goog.inherits(AccountProxy, puremvc.Proxy);

/**
 * Proxy NAME constant
 * @const
 * @type string
 */
AccountProxy.NAME = "AccountProxy";

/**
 * Gets the current balance
 * @returns {Number}
 */
AccountProxy.prototype.getBalance = function () {
    return this.data.balance;
};

/**
 * Sets the current balance
 * @param value {Number}
 */
AccountProxy.prototype.setBalance = function (value) {
    this.data.balance = value;
};