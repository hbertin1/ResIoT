import { useSelector } from 'react-redux'


function Display({ id }) {
    const isLedConnected = useSelector((state) => state.leds[id - 1].connected)
    const isLedOn = useSelector((state) => state.leds[id - 1].state)
    
    if (isLedConnected) {
        if (isLedOn) {
            return <li>🟢</li>
        }
        else {
            return <li>🔴</li>
        }
        
    }
    else return <li>Disconnected</li>
}

export default Display