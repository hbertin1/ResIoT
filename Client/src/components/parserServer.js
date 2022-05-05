import {createStore} from 'redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:3000');

client.onopen = () => {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({"connexion":true}))
};
client.onmessage = (message) => {
    console.log(message);
    let dataReceived = JSON.parse(message.data)
    console.log(dataReceived.knx)
    dispatch({
        "type": "setLedNumber",
        "number": 5
      })    
};