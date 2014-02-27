define(function(require, exports, module) {
'use strict';

/**
 * Exports
 *add eventname  only when the vent is unique .
 */

module.exports = {
  Indicators: {
    status:true,
    require:null,
    option: {
      'Battery': {
        status:true,
        eventName:['lowbattery', 'battery:low-10', 'battery:low-15', 
                  'battery:critical-6',  'battery:critical', 
                  'battery:healthy', 'battery:charging '],
      },
      'Geolocation': {
        status:false,
        eventName:['visibilitychange', 'settings:configured'],
      },
      'HDR':{
        status:false,
        eventName:'change:hdr',
      },
      'SelfTimer':{
        status:false,
        eventName:'change:timer'
      }
    }
  },
  lowbattery: {
    '15':{
      message:'battery-low-15-text',
      icon:'icon-battery-15',
      events: 'battery:low-15',
      value:15,
    },
    '10':{
      message:'battery-low-10-text',
      icon:'icon-battery-10',
      events: 'battery:low-10',
      value:10,
    },
    '6':{
      isSticky:true,
      message:'battery-low-critical-6-text',
      icon:'icon-battery-10',
      events: 'battery:critical-6',
      value:6,
    },
    '5':{
      isFulleScreen:true,
      message:'battery-low-critical-text',
      title:'battery-low-critical-title',
      events: 'battery:critical',
      icon:'',
      value:5,
    },
    'healthy':{
      events: 'battery:healthy',
      icon:'',
      value:0,
    }
  }
};
});