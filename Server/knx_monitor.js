var knx = require('knx');
const exitHook = require('async-exit-hook');
const Json = require('../Server/json.js')
const json = new Json();


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
            //envoie état btn pour websocket

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


var light1 = new knx.Devices.BinarySwitch({ ga: '0/0/1', status_ga: '0/0/101' }, connection);
var light2 = new knx.Devices.BinarySwitch({ ga: '0/0/2', status_ga: '0/0/102' }, connection);
var light3 = new knx.Devices.BinarySwitch({ ga: '0/0/3', status_ga: '0/0/103' }, connection);
var light4 = new knx.Devices.BinarySwitch({ ga: '0/0/4', status_ga: '0/0/104' }, connection);


let tabLight = [];
tabLight.push(light1, light2, light3, light4)
var speed = 0.2;
var timerId;
var indexChenillard=0;
var direction = true;
var etatChenillard = false;
var ligthState;
var ws;

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

function switchLed(id, state2change) {
  led = tabLight[id-1];
  if(state2change === 'on') {
    sendMessage(json.ledKnx("led",id,"switch","on"))
    led.switchOn();
  }
  else {
    sendMessage(json.ledKnx("led",id,"switch","off"))
    led.switchOff();
  }
}

function switchLedChenillard(oldIndex, newIndex) {
  tabLight[oldIndex].switchOff();
  tabLight[newIndex].switchOn();
  sendMessage(json.ledKnx("led",newIndex+1,"switch","on"))
  sendMessage(json.ledKnx("led",oldIndex+1,"switch","off"))
}

function rChenillard(newIndex, tabLight){
  console.log(newIndex)
  oldIndex = newIndex;
  if(direction){
    if(oldIndex == tabLight.length-1){
      newIndex = 0;
    }
    else {
      newIndex = oldIndex+1;
    }
  }
  else{
    if(oldIndex == 0){
      newIndex = tabLight.length-1;
    }
    else {
      newIndex = oldIndex-1;
    }
  }
  timerId = setTimeout(function(){
      switchLedChenillard(oldIndex, newIndex)
      rChenillard(newIndex, tabLight);
      indexChenillard = newIndex;
  },1000*speed);
}


function rChenillard2(newIndex, tabLight , allState){
  console.log(newIndex)
  oldIndex = newIndex;
  allState = allState;
  console.log(oldIndex)
  if(oldIndex == tabLight.length-1){
    allState='off'
    newIndex = oldIndex-1
  }
  else if(allState='off'){
    newIndex = oldIndex-1
  }
  else if(oldIndex == 0){
    allState = 'on'
    newIndex = oldIndex+1
  }
  timerId = setTimeout(function(){
    switchLed(newIndex+1, allState)
    rChenillard2(newIndex, tabLight)
    indexChenillard = newIndex;
},1000*speed);
}



function startStopChenillard() {
  if(timerId === undefined) {
    sendMessage(json.chenillardKnx("chenillard", "switch", "on"))
    rChenillard(indexChenillard, tabLight);
  }
  else {
    clearTimeout(timerId);
    timerId = undefined;
    sendMessage(json.chenillardKnx("chenillard", "switch", "off"))
  }
}

function sendMessage(json){
  ws.clients.forEach(client => {
    client.send(json)
  })
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

function initWebSocket(webSocket){
  ws = webSocket;
  for(var i = 1; i < tabLight.length+1; i++) {
    sendMessage(json.ledConnection("led", i, "addLed", "connected"));
    console.log("web message send")
  }
}


module.exports = {
  startStopChenillard: function () { startStopChenillard() },
  switchLed: function (id, state2change) { switchLed(id, state2change)},
  initWebSocket: function (webSocket) { initWebSocket(webSocket)}
}