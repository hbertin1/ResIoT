import Led from './Led';
import ChenillardBtn from './ChenillardBtn';
import { useSelector } from 'react-redux';
import DirectionBtn from './DirectionBtn';
// import { useSelector } from 'react-redux';
import { parseDataRcvd } from './ParserServer';
// import { useDispatch } from 'react-redux';
import { addLed } from './Store';
import SliderSpeed from './SliderSpeed';
import SelectPattern from './SelectPattern';

const axios = require('axios')
const urlServer = '127.0.0.1:8000'

function Body() {

    const ledNumber = useSelector((state) => state.ledNumber)
    // var valueSlider = 0;

    function addLeds(ledNumber) {
        console.log(ledNumber)
        var rows = [];
        for (let i = 1; i <= ledNumber; i++) {
            rows.push(<td><Led id={i} /></td>)
        }
        return rows;
    }

    return (
        <div class="tableChenillard">
            {<div>
                <table>
                    <tr>
                        {/* A VALIDER LE ADDLED() */}
                        {addLeds(ledNumber)}
                        {/* <td><Led id={1} /></td>
                        <td><Led id={2} /></td>
                        <td><Led id={3} /></td>
                        <td><Led id={4} /></td> */}
                    </tr>
                </table>
            </div>}
            <div class="slider">
                {/* <Slider aria-label="Speed"
                    // value={valueSlider}
                    onChange={handleSliderChange}
                /> */}
                <SliderSpeed />
                <SelectPattern />
            </div>
            <div class="chenillardBtn">
            <table>
                    <tr>
                        <td><ChenillardBtn /></td>
                        <td><DirectionBtn /></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Body