import { createStore } from "redux";

// state
const initialState = {
    leds: [],
    ledNumber: 0
};

// actions creators

export const onOff = (deviceId) => ({ 
  "type": "onOff",
  "id": deviceId
});

export const addLed = (id) => ({
  "type": "addLed",
  "id": id
});

export const restartLed = { "type": "restart" };

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
      "state": false,
      "color": "white"
    }
    console.log("push"+ JSON.stringify({ 
      "id": action.id,
      "state": false,
      "color": "white"
    }))

    state.leds.splice(action.id-1, 1, led)
    console.log("2"+JSON.stringify(state.leds))
  }

  if (action.type === "onOff") {
    const index = action.id-1
    const led = state.leds[index]
    led.state = !led.state
    state.leds[index] = led
  }

  console.log(state)
  
  return state;
}

export const store = createStore(reducer);