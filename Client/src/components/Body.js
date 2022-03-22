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
function sendStartSignalChenillard(currentState) {
    let res = false;
    let signal = `on`
    if (currentState) signal = `off`

    axios.get(`http://`+urlServer+`/chenillard?signal=`+ signal)
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