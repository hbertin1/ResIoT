import { w3cwebsocket as W3CWebSocket } from "websocket";
const axios = require('axios')

function ledBtn(){

    return (<div>
        <ul>
            <li>{id}</li>
            <li>{<Display id={id} />}</li>
            <li><button onClick={() => {
            }}>Start</button></li>
        </ul>
    </div>)

}
