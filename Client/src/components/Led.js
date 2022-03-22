import { useState } from 'react'
const axios = require('axios')

const urlServer = '127.0.0.1:8080'

function sendSignalLed(currentState, id) {
    let res = false
    let signal = `on`
    if (currentState) signal = `off`

    axios.get(`http://` +urlServer+ `/led?signal=` +signal+ `&number=`+id)
        .then(response => {
            if(response.data == `Ack Led ON`) res = true
            console.log(response)
            })
        .catch(error =>
            // handle error
            console.log(error)
        )
    return res;
}



function Led({id}) {
    const [state, updateState] = useState(false)

    return (<div>
            <ul>
                <li>{ id }</li>
                <li>{ state ? '🔴' : '🟢' }</li>
                <li><button onClick={() => sendSignalLed(state, id)? updateState(!state):updateState(!state)}>Start</button></li>
            </ul>
        </div>)
}

export default Led