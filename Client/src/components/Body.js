import Led from './Led'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from 'react-redux'
import { createServer } from './Store'
// import ChenillardBtn from './chenillardBtn'

const axios = require('axios')
const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:8000');

function Body() {
    const dispatch = useDispatch()

    client.onopen = () => {
        console.log('WebSocket Client Connected');
        client.send(JSON.stringify({"connexion":true}))
    };
    client.onmessage = (message) => {
        console.log(message);
        let dataReceived = JSON.parse(message.data)
        console.log(dataReceived.knx)
        dispatch({
            "type": "setLedNumber",
            "number": 5
          })    
    };

    dispatch(createServer(client))
    

    return (
        <div class="tableChenillard">
            {<div>
                <table>
                    <tr>
                        <td><Led id={1} /></td>
                        <td><Led id={2} /></td>
                        <td><Led id={3} /></td>
                        <td><Led id={4} /></td>
                    </tr>
                </table>
            </div>}
            <div>
                {/* <ChenillardBtn/> */}
            </div>
        </div>
    )
}

export default Body









// // TODO: how changing the leds preview when the chenillard is running
// function sendStartSignalChenillard(currentState) {
//     let res = false;
//     let signal = `on`
//     if (currentState) signal = `off`

//     axios.get(`http://` + urlServer + `/chenillard?signal=` + signal)
//         .then(response => (console.log(response)))
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })

//     // handle acknowledgment
//     return res;
// }
