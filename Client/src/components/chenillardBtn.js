
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const axios = require('axios')
const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:8000');

function chenillardBtn() {

    const dispatch = useDispatch()
    const isChenillardOn = useSelector((state) => state.chenillard.state)

    function sendStartSignalChenillard(currentState) {
        let res = false;
        let signal = `on`
        let speed = 10
        let direction = false
        if (currentState) signal = `off`

        axios.get(`http://` + urlServer + `/chenillard?signal=` + signal + `&speed=` + speed + `&direction=` + direction)
            .then(response => {
                console.log(response)
                chenillardState = !chenillardState
                console.log(chenillardState)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        // handle acknowledgment
        return res;
    }
    return;
}
          

export default chenillardBtn