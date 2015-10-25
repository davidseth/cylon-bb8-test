/*** IMPORT ***/

var chalk = require("chalk");
var cylonBLE = require('cylon-ble');
var Cylon = require('cylon');

var datajson = require('./data.json');
var bb8UUID = datajson.devices.bb8;

var ROBOT_SERVICE = '22bb746f2ba075542d6f726568705327';
var ROBOT_CHAR_COMMAND = '22bb746f2ba175542d6f726568705327';
var ROBOT_CHAR_NOTIFY = '22bb746f2ba675542d6f726568705327';

var BLE_RADIO_SERVICE = '22bb746f2bb075542d6f726568705327';
var BLE_RADIO_CHAR_RSSI = '22bb746f2bb675542d6f726568705327';

var DEVICE_INFO_SERVICE = '180a';
var DVC_INFO_CHAR_MANUFACTURER = '2a29';

/*** CONFIGURE ***/

Cylon.config({
    logging: {
        level: 'debug'
    }
});

Cylon.api({ host: "127.0.0.1", port: "8080" });

Cylon.robot({
    name: "bb8",
    connections: {
        bluetooth: {adaptor: 'central', uuid: bb8UUID, module: 'cylon-ble'}
    },
    devices: {
        bb8: {driver: 'bb8'}
    },
    sayRelax: function() {
      return this.name + " says relax";
    },
    roll: function() {
      console.log("Rolling!");
      this.bb8.setRGB(0xFF0000, 0, this.callbackFn);
      //this.sphero.roll(60, Math.floor(Math.random() * 360));
    },
    init: function() {
      console.log('starting ...');
          this.bb8.getDeviceMode(function(dvcModeError) {
             console.log("getDeviceMode", dvcModeError);
          });



          this.bb8.getRGB(function(dvcModeError) {
              console.log("getRGB", dvcModeError);
          });

      // this.bb8.getDeviceMode(function(dvcModeError) {
      //    console.log("getDeviceMode", dvcModeError);
      // });
    },
    work: function(my) {
      var callbackFn = function(cbError) {
        console.log('called');
          if (cbError) {
              console.log("callbackFn", cbError);
          }
      };
      //my.init();

      // this.bb8.getDeviceMode(function(dvcModeError) {
      //    console.log("getDeviceMode", dvcModeError);
      //  });
      // this.bb8.getRGB(function(dvcModeError) {
      //     console.log("getRGB", dvcModeError);
      // });

      // my.bb8.roll(80, 0, 1, callbackFn);
      // my.bb8.setRGB(0xFF0000, 0, callbackFn);

      // every((1).second(), function() {
      //   //this.roll();
      //   console.log(my.sayRelax());
      //   my.roll();
      //   //my.bb8.roll(180, 0, 1, callbackFn);
      //   //my.bb8.setRGB(0xFF0000, 0, callbackFn);
      // });
    },

    commands: function() {
      var commands = {};

      commands.init = this.init
      commands.do_a_thing = this.doAThing

      return commands;
    },

    doAThing: function() {
      console.log("I did a thing!");
    }
});

Cylon.start();
