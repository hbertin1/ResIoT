import { useSelector } from 'react-redux'

const axios = require('axios')
const urlServer = '//127.0.0.1:8000'
const client = new W3CWebSocket('ws://127.0.0.1:3000');

function ChenillardBtn() {

    const isChenillardOn = useSelector((state) => state.chenillard.state)
    const colorChenillardBtn = useSelector((state) => state.chenillard.colorChenillardBtn)

    function sendStartSignalChenillard(currentState) {
        let res = false;
        let signal = `on`
        let speed = 10
        let direction = false
        if (currentState) signal = `off`

        axios.get(`http://` + urlServer + `/chenillard?signal=` + signal + `&speed=` + speed + `&direction=` + direction)
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
    return(
        <button
            style={{ background: {colorChenillardBtn} }} 
            onClick={sendStartSignalChenillard(isChenillardOn)}>
            {isChenillardOn ? "Start the Chenillard":"Stop the Chenillard"}
            {console.log(colorChenillardBtn)}
        </button>
    )
}

export default ChenillardBtn