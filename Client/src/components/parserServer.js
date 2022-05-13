import { store } from './Store'
import { startStopChenillard } from './Store'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:3050');

client.onopen = () => {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({"connexion":true}))
};
client.onmessage = (message) => {
    parseDataRcvd(message.data)
    console.log("message received: " + JSON.stringify(message));
};    

// {"device" : "chenillard", "action": "switch", "state":"on"}

export function parseDataRcvd(data) {
    let dataStringified = JSON.stringify(data);
    let dataParsed = JSON.parse(dataStringified);              // not sure
    console.log(dataParsed);
    switch (dataParsed.device) {
        case 'chenillard':
            switch (dataParsed.action) {
                case 'switch':
                    switch (dataParsed.state) {
                        case 'on':
                            store.dispatch(startStopChenillard(true))
                            break;
                        case 'off':
                            store.dispatch(startStopChenillard(false))
                            break;
                    } 
                    break;
            }
            break;
    }

} 
