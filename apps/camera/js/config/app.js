define(function(require, exports, module) {
'use strict';

module.exports = {
  showSettings: true,
  enableZoom: true,
    lowbattery: {
    low: {
      notificationID: 'battery-low-text',
      icon: 'icon-battery-15',
      event: 'battery:low',
      value: 'low',
      level: 15
    },
    verylow: {
      notificationID: 'battery-verylow-text',
      icon: 'icon-battery-10',
      event: 'battery:verylow',
      value: 'verylow',
      level: 10
    },
    critical: {
      isPersistent: true,
      notificationID: 'battery-critical-text',
      icon: 'icon-battery-10',
      event: 'battery:critical',
      value: 'critical',
      level: 6
    },
    shutdown: {
      isFullScreen: true,
      notificationID: 'battery-shutdown-text',
      notificationTitleID: 'battery-shutdown-title',
      event: 'battery:shutdown',
      value: 'shutdown',
      level: 5
    },
    healthy: {
      event: 'battery:healthy',
      value: 'healthy',
      level: 100
    },
    charging: {
      event: 'battery:charging',
      value: 'charging'
    }
  },
  viewfinder: {
    scaleType: 'fill'
  },
  indicators: {
    enabled: {
      hdr: false,
      timer: true,
      battery: false,
      geolocation: false
    }
  },
  mode: {
    title: 'Mode',
    options: [
      {
        key: 'picture',
        title: 'Picture'
      },
      {
        key: 'video',
        title: 'Video'
      }
    ],
    persistent: false
  },

  isoModes: {
    disabled: false,
    options: [
      {
        key: 'auto',
        title: 'Auto'
      }
    ],
    selected:'auto'
  },

  whiteBalance: {
    disabled: false,
    options: [
      {
        key: 'auto',
        title: 'Auto'
      }
    ],
    selected:'auto'
  },

  cameras: {
    title: 'Selected Camera',
    options: [
      {
        key: 'back',
        title: 'Back'
      },
      {
        key: 'front',
        title: 'Front'
      }
    ],
    persistent: false
  },

  pictureSizesFront: {
    icon: 'icon-picture-size',
    maxPixelSize: window.CONFIG_MAX_IMAGE_PIXEL_SIZE,
    options: [
      // {
      //   key: '2048x1536'
      // }
    ],
    persistent: true,
    l10n: { title: 'camera-resolution' }
  },

  pictureSizesBack: {
    icon: 'icon-picture-size',
    maxPixelSize: window.CONFIG_MAX_IMAGE_PIXEL_SIZE,
    options: [
      // {
      //   key: '2048x1536'
      // }
    ],
    persistent: true,
    l10n: { title: 'camera-resolution' }
  },

  recorderProfilesBack: {
    icon: 'icon-video-size',
    options: [

      // NOTE: Disabled due to Helix crashing
      // when trying to record at these resolutions.

      // {
      //   key: '720p',
      //   title: '720p 1040X720'
      // },
      // {
      //   key: '480p',
      //   title: '480p 720X480'
      // },
      {
        key: 'cif',
        title: 'CIF 352X288'
      },
      {
        key: 'qcif',
        title: 'QCIF 176X144'
      }
    ],
    persistent: true,
    l10n: { title: 'video-resolution' }
  },

  recorderProfilesFront: {
    icon: 'icon-video-size',
    options: [

      // NOTE: Disabled due to Helix crashing
      // when trying to record at these resolutions.

      // {
      //   key: '720p',
      //   title: '720p 1040X720'
      // },
      // {
      //   key: '480p',
      //   title: '480p 720X480'
      // },
      {
        key: 'cif',
        title: 'CIF 352X288'
      },
      {
        key: 'qcif',
        title: 'QCIF 176X144'
      }
    ],
    persistent: true,
    l10n: { title: 'video-resolution' }
  },

  flashModesPicture: {
    options: [
      {
        key: 'auto',
        icon: 'icon-flash-auto',
        l10n: { title: 'auto' }
      },
      {
        key: 'on',
        icon: 'icon-flash-on',
        l10n: { title: 'on' }
      },
      {
        key: 'off',
        icon: 'icon-flash-off',
        l10n: { title: 'off' }
      }
    ],
    persistent: true
  },

  flashModesVideo: {
    options: [
      {
        key: 'off',
        icon: 'icon-flash-off',
        l10n: { title: 'off' }
      },
      {
        key: 'torch',
        icon: 'icon-flash-on',
        l10n: { title: 'on' }
      }
    ],
    persistent: true
  },

  timer: {
    icon: 'icon-timer',
    options: [
      {
        key: 'off',
        title: 'Off',
        value: 0,
        notificationID: 'timer-set-off'
      },
      {
        key: '3secs',
        value: 3,
        l10n: { title: '3-seconds' },
        notificationID: 'timer-set-3secs'
      },
      {
        key: '5secs',
        value: 5,
        l10n: { title: '5-seconds' },
        notificationID: 'timer-set-5secs'
      },
      {
        key: '10secs',
        value: 10,
        l10n: { title: '10-seconds' },
        notificationID: 'timer-set-10secs'
      }
    ],
    persistent: false,
    l10n: { title: 'self-timer' }
  },

  hdr: {
    title: 'HDR',
    icon: 'icon-hdr-menu',
    disabled: false,
    options: [
      {
        key: 'off',
        l10n: { title: 'off' },
        notificationID: 'hdr-set-off'
      },
      {
        key: 'on',
        l10n: { title: 'on' },
        notificationID: 'hdr-set-on'
      }
    ],
    persistent: true
  },

  scene: {
    icon: 'icon-scene',
    options: [
      {
        key: 'normal',
        title: 'Normal',
        notificationID: 'scene-set-normal'
      },
      {
        key: 'pano',
        title: 'Panorama',
        notificationID: 'scene-set-pano'
      },
      {
        key: 'beauty',
        title: 'Beauty',
        notificationID: 'scene-set-beauty'
      }
    ],
    persistent: true,
    l10n: { title: 'scene-mode' }
  },

  grid: {
    icon: 'icon-frame-grid',
    options: [
      {
        key: 'on',
        l10n: { title: 'on' },
        notificationID: 'grid-set-on'
      },
      {
        key: 'off',
        l10n: { title: 'off' },
        notificationID: 'grid-set-off'
      }
    ],
    selected: 'off',
    persistent: true,
    l10n: { title: 'grid' }
  },

  settingsMenu: {
    items: [
       {
         key: 'hdr'
       },
      // {
      //   key: 'scene'
      // },
      {
        key: 'grid'
      },
      {
        key: 'timer'
      },
      // {
      //   key: 'pictureSizesBack',
      //   condition: { 'cameras': 'back' }
      // },
      // {
      //   key: 'pictureSizesFront',
      //   condition: { 'cameras': 'front' }
      // },
      // {
      //   key: 'recorderProfilesBack',
      //   condition: { 'cameras': 'back' }
      // },
      // {
      //   key: 'recorderProfilesFront',
      //   condition: { 'cameras': 'front' }
      // }
    ]
  }
};

});
