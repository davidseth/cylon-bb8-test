var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: '78640f5a94184e1586edacce5dc337ee', module: 'cylon-ble' }
  },

  devices: {
    battery: { driver: 'ble-battery-service' },
    deviceInfo: { driver: 'ble-device-information' },
    generic: { driver: 'ble-generic-access' },
    characteristics: {driver: 'ble-characteristic'}
  },

  display: function(err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Data:", data);
    }
  },

  work: function(my) {
    my.generic.getDeviceName(function(err, data){
      my.display(err, data);
      my.generic.getAppearance(function(err, data){
        my.display(err, data);
        my.deviceInfo.getManufacturerName(function(err, data){
          my.display(err, data);

        });
      });
    });
  }
}).start();
