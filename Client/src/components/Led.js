import Display from './Display'
import { useSelector } from 'react-redux'

const axios = require('axios')
const urlServer = '127.0.0.1:8000'

function Led({ id }) {

    const isLedConnected = useSelector((state) => state.leds[id - 1].connected)
    const isLedOn = useSelector((state) => state.leds[id - 1].state)

    function sendStateLed(currentState) {
        let res = false;
        let signal = `on`
        if (!currentState) signal = `off`

        axios.get(`http://` + urlServer + `/led?signal=` + signal + `&id=` + id)
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

    return (<div>
        <ul>
            <li>{id}</li>
            <li>{<Display id={id} />}</li>
            <li><button onClick={() => {
                sendStateLed(!isLedOn);
            }}>Led</button></li>
            {/* A valider debut */}
            {/* <li>{isLedOn ? '🟢' : '🔴'}</li>
            <li><button onClick={() => {
                sendStateLed(true);
            }}>{() => {
                if (isLedConnected) {
                    if (isLedOn) {
                        return 'Stop';
                    }
                    else return 'Start';
                }
                else return 'disconnected';
            }
                }</button></li> */}
                {/* A valider fin */}
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