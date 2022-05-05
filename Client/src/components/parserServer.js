import { createStore } from "redux";

// {"knx" : this.knx, "numberLed": this.numberLed, "chenillard":this.chenillard}

export function parseDataRcvd(data) {
    let dataRcvd = JSON.parse(data)
console.log(dataRcvd)
}