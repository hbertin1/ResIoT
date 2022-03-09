import '../styles/Body.css'
import { useState } from 'react'
const axios = require('axios');



const leds = [1, 2, 3, 4, 5, 6, 7]
const urlServer = '127.0.0.1:8080'




function leds_list() {
    return (
        <ul>
            {leds.map((led) => (
                <li>led {led}</li>
            ))}
        </ul>
    )
}


function sendStartSignal() {
    axios.get(`http://`+urlServer+`/chenillard?signal=on`)
        .then(response => (console.log(response)))
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function Body() {
    const [running, setRunning] = useState(0)

    return (
        <div>
            {leds_list()}
            <button onClick={() => sendStartSignal()}>Start the Chenillard</button>
        </div>
    )
}

export default Body