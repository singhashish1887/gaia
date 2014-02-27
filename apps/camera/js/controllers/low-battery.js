define(function(require, exports, module) {
  /*jshint laxbreak:true*/

'use strict';

/**
 * Dependencies
 */

var bindAll = require('lib/bind-all');
var debug = require('debug')('controller:lowbattery');
var bind = require('lib/bind');

/**
 * Local variables
 **/

var indicatorConfig = require('config/indicator');

/**
 * Exports
 */

exports = module.exports = function(app) {
  return new LowBatteryController(app);
};

/**
 * Initialize a new `LowBatteryController`
 *
 * @param {Object} options
 */

function LowBatteryController(app) {
  this.app = app;
  this.camera = app.camera;
  this.battery = navigator.battery || navigator.mozBattery;
  bindAll(this);
  this.bindEvents();
  debug('initialized');
}

/**
 * Bind callbacks to required events.
 *
 */

LowBatteryController.prototype.bindEvents = function() {
  bind(this.battery, 'levelchange', this.onLevelChange);
  bind(this.battery, 'chargingchange', this.onLevelChange);
  this.app.on('settings:configured', this.onLevelChange);
};

/**
 * onLevelChange to handle low battery scenario
 *
 * @param {Object} options
 */
/*
LowBatteryController.prototype.lowBatteryHandler = function () {
  var value = Math.round(this.battery.level * 100);
  var charging = this.battery.charging;
  var app = this.app;
  value = 10;
  charging = false;
  if (value <= 5) {
    var camera = this.camera;
    var batteryObj = indicatorConfig.lowbattery[5];
    app.emit('lowbattery',batteryObj);
    if (camera.get('recording')) {
      camera.stopRecording();
    }  
    window.setTimeout(function() {
      window.close();
   }, 3000);
  } else if (value in indicatorConfig.lowbattery && !charging) {
    var batteryObj = indicatorConfig.lowbattery[value];
    //remove the the message if there is any
    app.emit('lowbattery',batteryObj);
  }
};
*/
LowBatteryController.prototype.onLevelChange = function () {
  var status = this.getStatus(this.battery);
  if (status) {
    this.app.emit(status.events, status);
  } else {
    this.app.emit('battery:charging');
  }
};

LowBatteryController.prototype.getStatus = function (battery) {
  var value = Math.round(battery.level * 100);
  var charging = battery.charging;
  switch (true) {
    case charging: return null;
    case value < 6: this.closeApplication(); return indicatorConfig.lowbattery[5];
    case value == 6: return indicatorConfig.lowbattery[6];
    case value <= 10 && value > 6: return indicatorConfig.lowbattery[10];
    case value <= 15 && value > 10: return indicatorConfig.lowbattery[15]; 
    default: return indicatorConfig.lowbattery['healthy'];
  }
};

LowBatteryController.prototype.closeApplication = function() {
  var camera = this.camera;
  if (camera.get('recording')) {
      camera.stopRecording();
    }  
  window.setTimeout(function() {
      window.close();
  }, 3000);
};
});