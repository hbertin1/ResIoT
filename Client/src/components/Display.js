import { useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const axios = require('axios')
const urlServer = '127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:3000');


function Display({ id }) {
    const isLedConnected = useSelector((state) => state.leds[id - 1].connected)
    const isLedOn = useSelector((state) => state.leds[id - 1].state)


    function sendStateLed(currentState) {
        let res = false;
        let signal = `on`
        if (!currentState) signal = `off`
    
        axios.get(`http://`+urlServer+`/led?signal=`+ signal+ `&id=` + id)
            .then(response => {
                console.log(response)
                })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        // handle acknowledgment
        return res;
    }

    
    if (isLedConnected) {
        sendStateLed(isLedOn)
        if (isLedOn) {
            return <li>🟢</li>
        }
        else {
            return <li>🔴</li>
        }
        
    }
    else return <li>Disconnected</li>
}

export default Display