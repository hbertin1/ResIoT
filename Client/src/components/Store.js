import { createStore } from "redux";

// state
const initialState = {
    ledId: 1,
    ledState: 'false',
};

// actions creators

export const onOff = () => ({ type: "onOff" });

export const restartLed = () => ({ type: "restart" });

function reducer(state = initialState, action) {
  if (action.type === "restart") {
    return initialState;
  }
  if (action.type === "onOff") {
    return {
        ...state,
        ledState: !state.ledState,
        };
  }
  
  return state;
}

export const store = createStore(reducer);