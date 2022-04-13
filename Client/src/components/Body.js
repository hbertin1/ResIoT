import Led from './Led'
import { store } from './Store'
import { useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
const axios = require('axios')

const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:8000');


function leds_table() {
    return (
        <div>
            <table>
                <tr>
                    <td><Led id={1} /></td>
                    <td><Led id={2} /></td>
                    <td><Led id={3} /></td>
                    <td><Led id={4} /></td>
                </tr>
            </table>
        </div>
    )
}

// TODO: how changing the leds preview when the chenillard is running
function sendStartSignalChenillard(currentState) {
    let res = false;
    let signal = `on`
    let speed = 10
    let direction = false
    if (currentState) signal = `off`

    axios.get(`http://`+urlServer+`/chenillard?signal=`+ signal + `&speed=` + speed + `&direction=` + direction)
        .then(response => (console.log(response)))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
    // handle acknowledgment
    return res;
}

function Body() {
    const [chenillardState, updateChenillardState] = useState(false)

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
        console.log(message);
        let dataReceived = JSON.parse(message)
        console.log(dataReceived.numberLed);
    };

    const dispatch = useDispatch()
    

    return (
        <div class="tableChenillard">
            {leds_table()}
            <button onClick={() => sendStartSignalChenillard(chenillardState) ? 
                    updateChenillardState(!chenillardState):updateChenillardState(!chenillardState)}>
                Start the Chenillard
            </button>
        </div>
    )
}

export default Body