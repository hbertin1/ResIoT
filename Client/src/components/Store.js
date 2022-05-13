import { createStore } from "redux";

// state
const initialState = {
    leds: [],
    ledNumber: 0,
    chenillard: {
      state: false,
      speed: 0, 
      colorButton: "red"
    },
    serverWS: undefined
};

// actions creators

export const onOffLed = (deviceId, state) => ({ 
  "type": "onOff",
  "id": deviceId,
  "state": state
});

export const addLed = (id, connect) => ({
  "type": "addLed",
  "id": id,
  "connected": connect
});

export const restartLed = { "type": "restart" };

export const startStopChenillard = (state) => ({
  "type": "startStopChenillard",
  "state": state
});

export const createServer = (websocket) => ({
  "type": "createServer",
  "server": websocket
})

function reducer(state = initialState, action) {
  if (action.type === "restart") {
    return initialState;
  }

  if(action.type === "setLedNumber") {
    console.log(action.number)
    state.ledNumber = action.number
    return state
  }

  if (action.type === "addLed") {
    let led = undefined
    led = {
      "id": action.id,
      "connected": action.connected,
      "state": false,
      "color": "white"
    }
    state.leds.splice(action.id-1, 1, led)
  }

  if (action.type === "onOff") {
    const index = action.id-1
    let copy_leds = state.leds
    let led_to_modify = copy_leds[index]
    let state2change = led_to_modify.state
    led_to_modify.state = action.state
    copy_leds.splice(index, 1, led_to_modify)
    return { ...state, leds:copy_leds };
  }

  if (action.type === "startStopChenillard") {
    let currentChenillard = state.chenillard
    currentChenillard.state = action.state
    let currentColor = currentChenillard.colorButton
    if(currentColor === "red") currentChenillard.colorButton = 'green'
    else currentChenillard.colorButton = 'red'
    return { ...state, chenillard:currentChenillard };
  }

  if(action.type === "createServer") {
    let serverWS = action.websocket
    return { ...state, server: serverWS };
  }

  return state;
}

export const store = createStore(reducer);