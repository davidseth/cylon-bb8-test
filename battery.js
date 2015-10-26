"use strict";

var Cylon = require('cylon');

// this is MetaWear's UART service
var metawear = {
  serviceUUID: "326a900085cb9195d9dd464cfbbae75a",
  txCharacteristic: "326a9001-85cb-9195-d9dd-464cfbbae75a", // transmit is from the phone's perspective
  rxCharacteristic: "326a9006-85cb-9195-d9dd-464cfbbae75a"  // receive is from the phone's perspective
};

//Cylon.robot({
//  connections: {
//    bluetooth: { adaptor: 'ble', uuid: '300ab429aca34fed84231499e14fb381' }
//  },
//
//  devices: {
//    battery: { driver: 'ble-battery-service' },
//    characteristics: {driver: 'ble-characteristic'}
//  },
//
//  work: function(my) {
//    //my.characteristics.writeCharacteristic(
//    //
//    //)
//    my.battery.getBatteryLevel(function(err, data) {
//      if (!!err) {
//        console.log("Error: ", err);
//        return;
//      }
//
//      console.log("Data: ", data);
//    });
//  }
//}).start();

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: '25eb129e57094461a23122dc6ebbdace' }
  },

  devices: {
    battery: { driver: 'ble-battery-service' },
    characteristics: {driver: 'ble-characteristic'},
    wiced: { driver: "ble-characteristic", serviceId: "180f", characteristicId: "2a19", connection: "bluetooth" },
    transmit: { driver: "ble-characteristic", serviceId: metawear.serviceUUID, characteristicId: metawear.txCharacteristic, connection: "bluetooth" },
    receive: { driver: "ble-characteristic", serviceId: metawear.serviceUUID, characteristicId: metawear.rxCharacteristic, connection: "bluetooth" }
  },

  work: function(my) {
    //my.wiced.readCharacteristic(function(err, data) {
    //  if (err) { return console.error("Error: ", err); }
    //  console.log("Battery wiced: ", data.readUInt8(0));
    //});

    //COLOR : { // 00 is GREEN, 01 is RED, 02 is BLUE
    //  "RED" : 0x01,
    //      "GREEN" : 0x00,
    //      "BLUE" : 0x02
    //},
    //
    var data = new Uint8Array(17);
    data[0] = 0x02; // Color Register
    data[1] = 0x03; //
    data[2] = 0x00; // THIS IS THE COLOR SLOT  00 is GREEN, 01 is RED, 02 is BLUE
    data[3] = 0x02; //
    data[4] = 0x1F; // high intensity  1F for solid
    data[5] = 0x64; // low intensity 64 for solid
    data[6] = 0x01; //
    data[7] = 0x01; //
    data[8] = 0x01; //
    data[9] = 0x01; // high intensity
    data[10] = 0x01; // low intensity
    data[11] = 0x01; // Rise Time
    data[12] = 0x01; // High Time
    data[13] = 0x01; // Fall time
    data[14] = 0x00; // Pulse Duration
    data[15] = 0x00; // Pulse Offset
    data[16] = 0x00; //repeat count


    my.battery.getBatteryLevel(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Data: ", data);
    });

    // build a value and pass to characteristic
    my.transmit.writeCharacteristic(data);

  }
}).start();
