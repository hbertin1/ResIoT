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
    
    switch (dataParsed.device) {
        case "all":
            if(dataParsed.action === "disconnect") {
                var json = {
                    "action":"disconnectLeds"
                }
                store.dispatch(json)
                break;
            }
        case 'chenillard':
            switch (dataParsed.action) {
                case 'switch':
                    switch (dataParsed.state) {
                        case 'on':
                            var json = ({
                                "type": "onOff",
                                "state": true
                            });
                            store.dispatch(json)
                            break;
                        case 'off':
                            var json = ({
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
                    var json = ({
                        "type": "reverseChenillard",
                        "state" : dataParsed.state
                    });
                    store.dispatch(json)
                    break;
                case 'changeSpeed':
                    var json = ({
                        "type": "setSpeed",
                        "speed": dataParsed.speed
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
                            var json = ({
                                "type": "onOffLed",
                                "id": dataParsed.id,
                                "state": true
                            });
                            store.dispatch(json)
                            break;
                        case 'off':
                            var json = ({
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
                            var json = ({
                                "type": "addLed",
                                "id": dataParsed.id,
                                "connected": true
                            });
                            store.dispatch(json)
                            break;
                        case 'not_connected':
                            var json = ({
                                "type": "addLed",
                                "id": dataParsed.id,
                                "connected": false
                            });
                            // store.dispatch(json)
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

} 
