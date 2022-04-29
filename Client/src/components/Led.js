//T0D0 : bien gerer les websockets a l'aide de
// https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

import Body from './Body'
import Display from './Display'
import { useDispatch } from 'react-redux'
import { onOff, addLed } from "./Store";

function Led({ id }) {

    
    const dispatch = useDispatch()
    dispatch(addLed(id, true))

    return (<div>
        <ul>
            <li>{id}</li>
            <li>{<Display id={id} />}</li>
            <li><button onClick={() => {
                dispatch(onOff(id))
            }}>Start</button></li>
        </ul>
    </div>)

}


export default Led




// function sendSignalLed(currentState, id) {
//     let finalState = currentState
//     let signal = `on`
//     if (currentState) signal = `off`

//     axios.get(`http://` + urlServer + `/led?signal=` + signal + `&number=` + id)
//         .then(response => {
//             switch (response.data) {
//                 case `Ack Led ON`:
//                     // dispatch(onOff)
//                     finalState = true
//                     break;
//                 case `Ack Led OFF`:
//                     // dispatch(onOff)
//                     finalState = false
//                     break;
//             }
//             console.log(response)
//         })
//         .catch(error =>
//             // handle error
//             console.log(error)
//         )
// }

// async function updateDisplay(state, id, updateState) {
//     const currentState = await sendSignalLed(state, id)

// }