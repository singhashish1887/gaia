define(function(require, exports, module) {
'use strict';

/**
 * Dependencies
 */

var debug = require('debug')('controller:indicator');
var bindAll = require('lib/bind-all');

/**
 * Exports
 */

module.exports = function(app) { return new IndicatorController(app); };
module.exports.IndicatorController = IndicatorController;

/**
 * Initialize a new `IndicatorsController`
 *
 * @param {Object} options
 */

function IndicatorController(app) {
  debug('initializing');
  bindAll(this);
  this.app = app;
  this.settings = app.settings;
  this.indicator = app.views.indicator;
  this.indicatorIcons = this.settings.indicators.get('icons');
  var enabled = this.settings.indicators.get('enabled');
  if (enabled) { this.bindEvents(); }
  debug('initialized :: ');
}

IndicatorController.prototype.bindEvents = function() {
  this.app.on('settings:configured', this.configure);

  if (this.indicatorIcons.timer) {
    this.settings.timer.on('change:selected', this.indicator.setter('timer'));
  }
  
  if (this.indicatorIcons.hdr) {
    this.settings.hdr.on('change:selected', this.indicator.setter('hdr'));
  }
  
  if (this.indicatorIcons.geolocation) {
    this.app.on('focus', this.geoLocationStatus);
  }

  if (this.indicatorIcons.battery) {
    this.app.on('battery:healthy', this.indicator.removeBatteryIndicator);
    this.app.on('battery:charging', this.indicator.removeBatteryIndicator);
    this.app.on('battery:very-low', this.indicator.setBattery);
    this.app.on('battery:low', this.indicator.setBattery);
    this.app.on('battery:near-critical', this.indicator.setBattery);
    this.app.on('battery:critical', this.indicator.setBattery); 
  }
};

IndicatorController.prototype.configure = function() {

  if (this.indicatorIcons.hdr) {
    this.indicator.set('hdr', this.settings.hdr.selected('key'));
  }

  if (this.indicatorIcons.timer) {
    this.indicator.set('timer', this.settings.timer.selected('key'));
  }

  if (this.indicatorIcons.geolocation) {
   this.geoLocationStatus();
  }
  this.indicator.show();
};

IndicatorController.prototype.geoLocationStatus = function() {
  var position = this.app.geolocation.position;
  var mozPerms = navigator.mozPermissionSettings;
  var apps = navigator.mozApps;
  var indicator = this.indicator;
  var self = this;
  apps.mgmt.getAll().onsuccess = function mozAppGotAll(evt) {
    var apps = evt.target.result;
    apps.forEach(function(app) {
      if (app.manifest.name == "Camera") {  //change Camera to CameraMadai for madai
        var value = mozPerms.get("geolocation", app.manifestURL, app.origin, false);
        switch (value) {
          case "allow":
            self.indicator.set('geotagging', 'on');
            break;
          case "deny":
            self.indicator.set('geotagging', 'off');
            break;
          case "prompt":{
            setTimeout(function(){self.geoLocationStatus();},500);
            break;
          }
        }
      }
    });
  };
};

});