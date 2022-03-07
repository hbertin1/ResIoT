import '../styles/Body.css'
import '../client/client'

const leds = [1, 2, 3, 4, 5, 6, 7]

function connect() {

}

function leds_list() {
    return (
        <ul>
            {leds.map((led) => (
                <li>led {led}</li>
            ))}
        </ul>
    )
}

function startChenillard(event) {
    connect()
}

function Body() {
    return (
        <div>
            {leds_list()}
            <button onClick={startChenillard}>Start the Chenillard</button>
        </div>
    )
}

export default Body