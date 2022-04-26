
import { w3cwebsocket as W3CWebSocket } from "websocket";
const axios = require('axios')


const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:8000');

let chenillardState = false
let nameBtn = 'Start Chenillard'

function chenillardBtn(){

   

    function sendStartSignalChenillard(currentState) {
        let res = false;
        let signal = `on`
        let speed = 10
        let direction = false
        if (currentState) signal = `off`
    
        axios.get(`http://`+urlServer+`/chenillard?signal=`+ signal + `&speed=` + speed + `&direction=` + direction)
            .then(response => {
                console.log(response)
                chenillardState = !chenillardState
                console.log(chenillardState)})
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        if(chenillardState){
            nameBtn = 'Start Chenillard'
        }
        else{
            nameBtn = 'Stop Chenillard'
        }
        console.log(nameBtn)
        
        // handle acknowledgment
        return res;
    }

    return (
        <div class="tableChenillard">
            { <button onClick={() => sendStartSignalChenillard(chenillardState)}>
                {nameBtn}
            </button> }
        </div>
          
    )


}

export default chenillardBtn