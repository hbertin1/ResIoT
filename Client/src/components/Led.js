//T0D0 : bien gerer les websockets a l'aide de
// https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

import Body from './Body'
import { useState } from 'react'
import { store } from './Store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const axios = require('axios')

const urlServer = '127.0.0.1:8000'

function sendSignalLed(currentState, id) {
    let finalState = currentState
    let signal = `on`
    if (currentState) signal = `off`

    axios.get(`http://` + urlServer + `/led?signal=` + signal + `&number=` + id)
        .then(response => {
            switch (response.data) {
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



function Led({ id }) {
    
    // const [state, updateState] = useState(false)
    const dispatch = useDispatch()
    dispatch({
        "type": "addLed",
        "id": id
      })

    // const state = useSelector(state => state.leds[id].state)


    return (<div>
        <ul>
            <li>{id}</li>
            <li>{true ? '🔴' : '🟢'}</li>
            <li><button onClick={() => 
                // dispatch({ type: "onOff" })
                console.log("")
                // client.send(JSON.stringify({"type":"LED", "id":id, "action":"onOff"}))
            }>Start</button></li>
        </ul>
    </div>)
}


export default Led