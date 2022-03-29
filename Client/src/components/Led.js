import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const axios = require('axios')

const urlServer = '127.0.0.1:8080'

function sendSignalLed(currentState, id) {
    // const dispatch = useDispatch()
    
    let finalState = currentState
    let signal = `on`
    if (currentState) signal = `off`

    axios.get(`http://` +urlServer+ `/led?signal=` +signal+ `&number=`+id)
        .then(response => {
            switch(response.data) {
                case `Ack Led ON`:
                    // dispatch(onOff)
                    finalState = true
                    break;
                case `Ack Led OFF`:
                    // dispatch(onOff)
                    finalState = false
                    break;
            }
            console.log(response)
            })
        .catch(error =>
            // handle error
            console.log(error)
        )
}

async function updateDisplay(state, id, updateState) {
    const currentState = await sendSignalLed(state, id)
    
}



function Led({id}) {
    const [state, updateState] = useState(false)
    // const state = useSelector(state => state.ledState)
    
    return (<div>
            <ul>
                <li>{ id }</li>
                <li>{ state ? '🔴' : '🟢' }</li>
                <li><button onClick={() => updateState(!state)
                //updateDisplay(state, id, updateState)
                    }>Start</button></li>
            </ul>
        </div>)
}

export default Led