import { useSelector } from 'react-redux'


function Display({ id }) {
    const stateLed = useSelector((state) => state.leds[0])

    console.log(JSON.stringify(stateLed))
    console.log("Display")
    // return (
    //     <div>
    //         <li>test{console.log(useSelector((state) => state.leds[id - 1]).state)}</li>
    //         <li>{useSelector((state) => state.leds[id - 1]).state ? '🟢' : '🔴'}</li>
    //     </div>
    // )
    if (stateLed) {
        if (stateLed.state === true) {
            return <li>🟢</li>
        }
        else if (stateLed.state === false) {
            return <li>🔴</li>
        }
    }
    else return <li>Led disconnected</li>
}

export default Display