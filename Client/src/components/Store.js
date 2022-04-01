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

  if (action.type === "addLed") {
    const led = {
      "id": action.id,
      "state": false,
      "color": "white"
    }
    state.leds.push(led);   // pas forcement le bon index
    console.log(state.leds)
  }

  if (action.type === "onOff") {
    const ledId = action.id
    const led = state.leds[ledId]
    led.state = !led.state
    state.leds[ledId] = led
    
    return { ...state };
  }
  
  return state;
}

export const store = createStore(reducer);