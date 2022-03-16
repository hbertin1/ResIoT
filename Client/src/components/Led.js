import { useState } from 'react'
const axios = require('axios');

const urlServer = '127.0.0.1:8080'

function sendStartSignalLed() {
    let res = false;

    axios.get(`http://`+urlServer+`/led?signal=on&number=on`)
        .then(response => (console.log(response)))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    // add acknowledgment to modify res
    res = true; // temp to test
    return res;
}

function Led({id}) {
    const [state, updateState] = useState(false)

    return (<div>
            <ul>
                <li>{ id }</li>
                <li>{ state ? '🔴' : '🟢' }</li>
                <li><button onClick={() => sendStartSignalLed()? updateState(!state):updateState(!state)}>Start</button></li>
            </ul>
        </div>)
}

export default Led