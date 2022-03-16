import '../styles/Body.css'
import Led from './Led'
import { useState } from 'react'
const axios = require('axios');

const urlServer = '127.0.0.1:8080'

function leds_table() {
    return (
        <div>
            <table>
                <tr>
                    <td><Led id={1} /></td>
                    <td><Led id={2} /></td>
                    <td><Led id={3} /></td>
                    <td><Led id={4} /></td>
                    <td><Led id={5} /></td>
                    <td><Led id={6} /></td>
                    <td><Led id={7} /></td>
                    <td><Led id={8} /></td>
                    <td><Led id={9} /></td>
                </tr>
            </table>
        </div>
    )
}

// TODO: how changing the leds preview when the chenillard is running
function sendStartSignal() {
    let res = false;

    axios.get(`http://`+urlServer+`/led?signal=on&number=on`)
        .then(response => (console.log(response)))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    
    // handle acknowledgment
    return res;
}

function Body() {
    const [running, setRunning] = useState(0)


    return (
        <div class="tableChenillard">
            {leds_table()}
            <button onClick={() => sendStartSignal()}>Start the Chenillard</button>
        </div>
    )
}

export default Body