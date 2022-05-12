var knx = require('knx');
const exitHook = require('async-exit-hook');

var connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: '192.168.0.201', ipPort: 3671,
  // in case you need to specify the multicast interface (say if you have more than one)
  // interface: 'utun2',
  // the KNX physical address we'd like to use
  physAddr: '15.15.15',
  // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
  loglevel: 'info',
  // do not automatically connect, but use connection.Connect() to establish connection
  //manualConnect: true,  
  // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
  forceTunneling: true,
  // wait at least 10 millisec between each datagram
  minimumDelay: 10,
  // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
  suppress_ack_ldatareq: false,
  // 14/03/2020 In tunneling mode, echoes the sent message by emitting a new emitEvent, so other object with same group address, can receive the sent message. Default is false.
  localEchoInTunneling: false,
  // define your event handlers here:
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function () {
      console.log('Hurray, I can talk KNX!');
      // WRITE an arbitrary boolean request to a DPT1 x address
      connection.write("0/0/1", 1);
      // you can also issue a READ request and pass a callback to capture the response
      connection.read("0/0/1", (src, responsevalue) => {
        console.log("src : %s , responsevalue : %s", src, responsevalue);
      });
    },
    // get notified for all KNX events:
    event: function (evt, src, dest, value) {
      console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt, src, dest, value
      );
      switch (dest) {
        case '1/0/1':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          console.log("value parsed ", valueparsed.data[0]);
          if (valueparsed.data[0] === 0) {
            startStopChenillard();
          }
          break;
          //     // console.log("test The current light1 status is %j", light1.status);
          //     // if(JSON.stringify(light1.status.current_value)) {
          //     //   light1.switchOff()
          //     // } 
          //     // else {
          //     //   light1.switchOn()
          //     // }

          //     // if (valueparsed.data[0] === 0) {
          //     //   console.log("test")
          //     //   light1.switchOff()
          //     // }
          // else {
          //   console.log("test2")
          //   light1.switchOn()
          // }
          break;
        case '1/0/2':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          console.log("value parsed ", valueparsed.data[0]);
          if (valueparsed.data[0] === 0) {
            direction = !direction;
          }
          break;
        case '1/0/3':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          console.log("value parsed ", valueparsed.data[0]);
          if (valueparsed.data[0] === 0) {
            speed = speed*2;
          }
          break;
        case '1/0/4':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          console.log("value parsed ", valueparsed.data[0]);
          if (valueparsed.data[0] === 0) {
            speed = speed/2;
          }
          break;
      }
    },
    // get notified on connection errors
    error: function (connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});

connection.Connect()

var ligthState;

var light1 = new knx.Devices.BinarySwitch({ ga: '0/0/1', status_ga: '0/0/101' }, connection);
var light2 = new knx.Devices.BinarySwitch({ ga: '0/0/2', status_ga: '0/0/102' }, connection);
var light3 = new knx.Devices.BinarySwitch({ ga: '0/0/3', status_ga: '0/0/103' }, connection);
var light4 = new knx.Devices.BinarySwitch({ ga: '0/0/4', status_ga: '0/0/104' }, connection);


console.log("The current light1 status is %j", light1.status.current_value);
light1.control.on('change', function (oldvalue, newvalue) {
  // console.log("**** light1 control changed from: %j to: %j", oldvalue, newvalue);
  ligthState = newvalue
});
light1.status.on('change', function (oldvalue, newvalue) {
  console.log("**** light1 status changed from: %j to: %j", oldvalue, newvalue);
});
//light1.switchOn(); // or switchOff();

function switchLight() {
  if (ligthState) {
    light1.switchOff();
  }
  else {
    light1.switchOn();
  }
  // connection.read("0/0/1", (src, responsevalue) => {
  //   console.log("src : %s , responsevalue : %s", src, responsevalue);
  // });
  // console.log("The current light1 status is %j", light1.status.current_value);
}

function switchLedChenillard(ledOn, ledOff) {
  ledOn.switchOff();
  ledOff.switchOn();
}

let tabLight = [];
tabLight.push(light1, light2, light3, light4)
var speed = 0.2;
var timerId;
var indexChenillard=0;
var direction = true;

async function chenillard() {
  intervalId = setInterval(function () {
    timerId1 = setTimeout(switchLedChenillard,  1000*speed, light1, light2);
    timerId2 = setTimeout(switchLedChenillard,  2000*speed, light2, light3);
    timerId3 = setTimeout(switchLedChenillard,  3000*speed, light3, light4);
    timerId4 = setTimeout(switchLedChenillard,  4000*speed, light4, light1);
 
  }, 4000*speed)
}

function rChenillard(newIndex, tabLight){
  oldIndex = newIndex;
  console.log(oldIndex)
  console.log(newIndex)
  console.log(direction)
  if(direction){
    if(oldIndex == tabLight.length-1){
      newIndex = 0;
    }
    else {
      newIndex = oldIndex+1;
    }
  }
  else{
    console.log(oldIndex)
    console.log(newIndex)
    if(oldIndex == 0){
      newIndex = tabLight.length-1;
      console.log(newIndex)
    }
    else {
      newIndex = oldIndex-1;
    }
  }
  timerId = setTimeout(function(){
      switchLedChenillard(tabLight[oldIndex], tabLight[newIndex])
      rChenillard(newIndex, tabLight);
      indexChenillard = newIndex;
  },1000*speed);
}

function startStopChenillard() {
  console.log(timerId)
  if(timerId === undefined) {
    rChenillard(indexChenillard, tabLight);
  }
  else {
    clearTimeout(timerId);
    timerId = undefined;
  }
}

exitHook(cb => {
  console.log('Disconnecting from KNX…');
  light1.switchOff();
  light2.switchOff();
  connection.Disconnect(() => {
    console.log('Disconnected from KNX');
    cb();
  });
});


module.exports = {
  startStopChenillard: function () { startStopChenillard() },
  
}