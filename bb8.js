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
    events: ['heading', 'turned_off'],
    sayRelax: function() {
        return this.name + " says relax";
    },
    roll: function(my) {
        console.log("Rolling!");
        console.log(this);
        var david = this;
        this.bb8.devModeOn(function(wakeError) {
            console.log("wake", wakeError);
            console.log("----------------------------------");
            console.log(david);
            //this.bb8.getDeviceMode(function(dvcModeError) {
            //    console.log("getDeviceMode", dvcModeError);
            //});
            david.bb8.roll(180, 180, 1);

            //setTimeout(function(david) { console.log("roll");  david.bb8.roll(180, 180, 1, callbackFn); }, 20);
        });
    },
    roll2: function(my) {
        console.log("Rolling 2");
        var david = this;
        console.log(this);
        //this.bb8.wake
        this.bb8.roll(180, 90, 1);

    },
    ollie: function(my) {
        var david = this;
        this.bb8.wake(function(err, data){
            console.log("wake");
            after(200, function() {
                david.bb8.setRGB(0x00FFFF);
            });
            after(500, function() {
                david.bb8.setRGB(0xFF0000);

                david.bb8.roll(60, 0, 1);
                after(1000, function(){
                    david.bb8.roll(60, 90, 1);

                    after(1000, function(){
                        david.bb8.stop();
                    });
                });
            });
        });
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

        every((1).second(), function() {
            console.log(my.bb8.heading);
            my.emit('heading', { data: my.bb8.heading});
        });
    },
    commands: {
        init: function() {this.init.call(this); },
        roll: function() {this.roll.call(this);},
        roll2: function() {this.roll2.call(this);},
        ollie: function() {this.ollie.call(this);}
    },
    //commands: function() {
    //  var commands = {};
    //
    //  commands.init = this.init
    //  commands.do_a_thing = this.doAThing
    //  commands.roll = this.roll
    //
    //  return commands;
    //},

    doAThing: function() {
        console.log("I did a thing!");
    }
});

Cylon.start();
