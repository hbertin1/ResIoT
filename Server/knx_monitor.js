var knx = require('knx');
const exitHook = require('async-exit-hook');
const Json = require('../Server/json.js')
const json = new Json();


var connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: '192.168.0.202', ipPort: 3671,
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
          if (valueparsed.data[0] === 0) {
            startStopChenillard();
          }
          break;
        case '1/0/2':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          if (valueparsed.data[0] === 0) {
            changeDirectionChenillard(direction.toString());
          }
          break;
        case '1/0/3':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          if (valueparsed.data[0] === 0) {
            if (speed * 2 > 1100) speed = 1100;
            speed = speed * 2;
            sendMessage(json.changeSpeedChenillard(speed))
          }
          break;
        case '1/0/4':
          valueStringified = JSON.stringify(value);
          valueparsed = JSON.parse(valueStringified);
          if (valueparsed.data[0] === 0) {
            if (speed / 2 < 300) speed = 300;
            speed = speed / 2;
            sendMessage(json.changeSpeedChenillard(speed))
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
var speed = 200;
var timerId;
var indexChenillard = 0;
var direction = true;
var etatChenillard = false;
var ligthState;
var ws;
motif = "chenillard"

console.log("The current light1 status is %j", light1.status.current_value);
light1.control.on('change', function (oldvalue, newvalue) {
  // console.log("**** light1 control changed from: %j to: %j", oldvalue, newvalue);
  ligthState = newvalue
});
light1.status.on('change', function (oldvalue, newvalue) {
  console.log("**** light1 status changed from: %j to: %j", oldvalue, newvalue);
});




function switchLed(id, state2change) {
  led = tabLight[id - 1];
  if (state2change === 'on') {
    sendMessage(json.ledKnx("led", id, "switch", "on"))
    led.switchOn();
  }
  else {
    sendMessage(json.ledKnx("led", id, "switch", "off"))
    led.switchOff();
  }
}

function switchLedChenillard(oldIndex, newIndex) {
  tabLight[oldIndex].switchOff();
  tabLight[newIndex].switchOn();
  sendMessage(json.ledKnx("led", newIndex + 1, "switch", "on"))
  sendMessage(json.ledKnx("led", oldIndex + 1, "switch", "off"))
}

//Motif classique du chenillard
function rChenillard(newIndex, tabLight) {
  oldIndex = newIndex;
  if (direction) {
    if (oldIndex == tabLight.length - 1) {
      newIndex = 0;
    }
    else {
      newIndex = oldIndex + 1;
    }
  }
  else {
    if (oldIndex == 0) {
      newIndex = tabLight.length - 1;
    }
    else {
      newIndex = oldIndex - 1;
    }
  }
  timerId = setTimeout(function () {
    switchLedChenillard(oldIndex, newIndex)
    rChenillard(newIndex, tabLight);
    indexChenillard = newIndex;
  }, speed);
}

function switchLedChenillardFull(index, stateFull) {
  if (stateFull) {
    tabLight[index].switchOff();
    sendMessage(json.ledKnx("led", index + 1, "switch", "off"))
  }
  else {
    tabLight[index].switchOn();
    sendMessage(json.ledKnx("led", index + 1, "switch", "on"))
  }
}

//Second motif du chenillard
function rChenillardFull(newIndex, tabLight, stateFull) {
  oldIndex = newIndex
  stateFull = stateFull;
  if (direction) {
    if (!stateFull) {
      if (oldIndex == tabLight.length - 1) {
        stateFull = true
      }
      else {
        newIndex = oldIndex + 1
      }
    }
    else {
      if (oldIndex == 0) {
        stateFull = false
      }
      else {
        newIndex = oldIndex - 1
      }
    }
  }
  else {
    if (!stateFull) {
      if (oldIndex == 0) {
        stateFull = true
      }
      else {
        newIndex = oldIndex - 1
      }
    }
    else {
      if (oldIndex == tabLight.length - 1) {
        stateFull = false
      }
      else {
        newIndex = oldIndex + 1
      }
    }
  }
  timerId = setTimeout(function () {
    switchLedChenillardFull(newIndex, stateFull)
    rChenillardFull(newIndex, tabLight, stateFull)
    indexChenillard = newIndex;
  }, speed);
}

function switchLedChenillardK2000(index, stateFull) {
  if (stateFull) {
    tabLight[index].switchOff();
    sendMessage(json.ledKnx("led", index + 1, "switch", "off"))
  }
  else {
    tabLight[index].switchOn();
    sendMessage(json.ledKnx("led", index + 1, "switch", "on"))
  }
}

//Troisi??me motif du chenillard
function rChenillardk2000(newIndex, tabLight, stateFull, changeDirection) {
  oldIndex = newIndex
  stateFull = stateFull;
  changeDirection = changeDirection
  if (!changeDirection) {
    if (oldIndex == tabLight.length - 1 && !stateFull) {
      stateFull = true
      newIndex = 0;
    }
    else if (oldIndex == tabLight.length - 1 && stateFull) {
      stateFull = false
      changeDirection = true
      newIndex = tabLight.length - 1
    }
    else {
      newIndex = oldIndex + 1
    }
  }
  else {
    if (oldIndex == 0 && !stateFull) {
      stateFull = true
      newIndex = tabLight.length - 1
    }
    else if (oldIndex == 0 && stateFull) {
      stateFull = false
      changeDirection = false
      newIndex = 0
    }
    else {
      newIndex = oldIndex - 1
    }
  }
  timerId = setTimeout(function () {
    switchLedChenillardK2000(newIndex, stateFull)
    rChenillardk2000(newIndex, tabLight, stateFull, changeDirection)
    indexChenillard = newIndex;
  }, speed);
}

//D??marre le chenillard en fonction du motif ou arrete le chenillard
function startStopChenillard() {
  if (timerId === undefined) {
    switch (motif) {
      case "chenillard":
        sendMessage(json.chenillardKnx("chenillard", "switch", "on"))
        rChenillard(indexChenillard, tabLight);
        break
      case "full":
        sendMessage(json.chenillardKnx("chenillard", "switch", "on"))
        rChenillardFull(indexChenillard, tabLight, false);
        break
      case "K2000":
        sendMessage(json.chenillardKnx("chenillard", "switch", "on"))
        rChenillardk2000(indexChenillard, tabLight, false, false);
        break
    }
  }
  else {
    console.log('disconnect')
    clearTimeout(timerId);
    timerId = undefined;
    sendMessage(json.chenillardKnx("chenillard", "switch", "off"))
  }

}

//Permet d'envoyer un json en websocket
function sendMessage(json) {
  ws.clients.forEach(client => {
    client.send(json)
  })
}

//Initialise le websocket et envoie au client le nombre de led connect?? au KNX
function initWebSocket(webSocket) {
  ws = webSocket;
  if (ws) {
    for (var i = 1; i < tabLight.length + 1; i++) {
      sendMessage(json.ledConnection("led", i, "addLed", "connected"));
    }
  }
}

//Change la vitesse du chenillard et envoie la vitesse au client
function changeSpeedChenillard(new_speed) {
  speed = (-8 * new_speed) + 1000;
  sendMessage(json.changeSpeedChenillard(speed))
}

//Change la direction du chenillard et l'envoie au client 
function changeDirectionChenillard(new_direction) {
  if (new_direction === 'true') direction = false;
  else direction = true;
  sendMessage(json.directionChenillard("chenillard", "reverse", direction))
}

//Change le motif du chenillard
function changePattern(pattern) {
  motif = pattern;
}

//D??connexion de la maquette KNX et ??teinds toutes les leds
exitHook(cb => {
  console.log('Disconnecting from KNX???');
  tabLight.forEach(light => {
    light.switchOff();
  });
  sendMessage(json.sendDisconnectMessage());
  connection.Disconnect(() => {
    console.log('Disconnected from KNX');
    cb();
  });
});

module.exports = {
  startStopChenillard: function () { startStopChenillard() },
  switchLed: function (id, state2change) { switchLed(id, state2change) },
  initWebSocket: function (webSocket) { initWebSocket(webSocket) },
  changeSpeedChenillard: function (new_speed) { changeSpeedChenillard(new_speed) },
  changeDirectionChenillard: function (new_direction) { changeDirectionChenillard(new_direction) },
  changePattern: function (pattern) { changePattern(pattern) },
}