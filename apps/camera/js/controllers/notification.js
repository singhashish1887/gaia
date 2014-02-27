define(function(require, exports, module) {
  /*jshint laxbreak:true*/

'use strict';

/**
 * Dependencies
 */

var bindAll = require('lib/bind-all');
var debug = require('debug')('controller:notification');
var bind = require('lib/bind');

/**
 * Local variables
 **/

var NotificationView = require('views/notification');

/**
 * Exports
 */

exports = module.exports = function(app) {
  return new NotificationController(app);
};

/**
 * Initialize a new `LowBatteryController`
 *
 * @param {Object} options
 */

function NotificationController(app) {
  this.app = app;
  this.camera = app.camera;
  this.notification = [];
  this.timeout = null;
  bindAll(this);
  this.bindEvents();
  debug('initialized');
}

/**
 * Bind callbacks to required events.
 *
 */

NotificationController.prototype.bindEvents = function() {
  this.app.on('battery:healthy', this.removeAllNotification); 
  this.app.on('battery:critical-6', this.onLowBattery); 
  this.app.on('battery:low-10', this.onLowBattery);
  this.app.on('battery:low-15', this.onLowBattery); 
  this.app.on('battery:critical', this.onLowBattery);
};

NotificationController.prototype.onLowBattery = function(lowBatteryObj) {
  this.checkNotificationQueue();
  var self = this; 
  var notification = new NotificationView(lowBatteryObj);
  notification.appendTo(document.body);
  if (!lowBatteryObj.isSticky) {
    this.notification.push(notification);
    this.timeout = window.setTimeout(function() {
      self.clearNotificationQueue(notification);
    }, 3000);
  } else {
    this.removeAllNotification();
    this.persistent = notification;
  }
  
};

NotificationController.prototype.checkNotificationQueue = function() {
 if (this.notification.length > 0) {
 	this.clearNotificationQueue(this.notification[0]);
 }
};

NotificationController.prototype.clearNotificationQueue = function(notification) {
  window.clearTimeout(this.timeout);
  this.timeout = null;
  notification.destroy();
  this.notification = [];
  
};

NotificationController.prototype.removeAllNotification = function() {
  if(this.persistant) {
    this.persistent.destroy();
    this.persistent = null; 
  }
  this.checkNotificationQueue();
};

});