import { store } from './Store'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:3050');

client.onopen = () => {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({ "connexion": true }))
};
client.onmessage = (message) => {
    parseDataRcvd(message.data)
    console.log("message received: " + JSON.stringify(message));
};

// {"device" : "chenillard", "action": "switch", "state":"on"}

export function parseDataRcvd(data) {
    
    let dataParsed = JSON.parse(data);              // not sure
    console.log(dataParsed);

    let json;
    
    switch (dataParsed.device) {
        case 'chenillard':
            switch (dataParsed.action) {
                case 'switch':
                    switch (dataParsed.state) {
                        case 'on':
                            json = ({
                                "type": "onOff",
                                "state": true
                            });
                            store.dispatch(json)
                            break;
                        case 'off':
                            json = ({
                                "type": "onOff",
                                "state": false
                            });
                            store.dispatch(json)
                            break;
                        default:
                            console.error("Unknown data received: " + dataParsed)
                            break;
                    }
                    break;
                case 'reverse':
                    json = ({
                        "type": "reverseChenillard"
                    });
                    store.dispatch(json)
                    break;
                default:
                    console.error("Unknown data received: " + dataParsed)
                    break;
            }
            break;
        case 'led':
            switch (dataParsed.action) {
                case 'switch':
                    switch (dataParsed.state) {
                        case 'on':
                            json = ({
                                "type": "onOffLed",
                                "id": dataParsed.id,
                                "state": true
                            });
                            store.dispatch(json)
                            break;
                        case 'off':
                            json = ({
                                "type": "onOffLed",
                                "id": dataParsed.id,
                                "state": false
                            });
                            store.dispatch(json)
                            break;
                        default:
                            console.error("Unknown data received: " + dataParsed)
                            break;
                    }
                    break;
                case 'addLed':
                    switch (dataParsed.connect_status) {
                        case 'connected':
                            json = ({
                                "type": "addLed",
                                "id": dataParsed.id,
                                "connected": true
                            });
                            store.dispatch(json)
                            break;
                        case 'not_connected':
                            json = ({
                                "type": "addLed",
                                "id": dataParsed.id,
                                "connected": false
                            });
                            store.dispatch(json)
                            break;
                        default:
                            console.error("Unknown data received: " + dataParsed)
                            break;
                    }
                    break;
                default:
                    console.error("Unknown data received: " + dataParsed)
                    break;
            }
            break;
        default:
            console.error("Unknown data received: " + dataParsed)
            break
    }
    json = null;

} 
