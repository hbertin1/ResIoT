import { w3cwebsocket as W3CWebSocket } from "websocket";
const axios = require('axios')


const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:8000');

function ledBtn(){



    function sendStateLed(currentState) {
        let res = false;
        let signal = `on`
        if (!currentState) signal = `off`
    
        axios.get(`http://`+urlServer+`/led?signal=`+ signal+ `&id=` + id)
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
                //sendStateLed(isLedOn)
            }}>Start</button></li>
        </ul>
    </div>)

}
