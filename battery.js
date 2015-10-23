"use strict";

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '78640f5a94184e1586edacce5dc337ee' }
  },

  devices: {
    battery: { driver: 'ble-battery-service' },
    characteristics: {driver: 'ble-characteristic'}
  },

  work: function(my) {
    my.characteristics.writeCharacteristic(
      
    )
    my.battery.getBatteryLevel(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Data: ", data);
    });
  }
}).start();
