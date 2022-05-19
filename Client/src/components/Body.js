import Led from './Led';
import ChenillardBtn from './ChenillardBtn';
import DirectionBtn from './DirectionBtn';
// import { useSelector } from 'react-redux';
import { parseDataRcvd } from './ParserServer';
import Slider from '@mui/material/Slider';
import { useDispatch } from 'react-redux';
import { addLed } from './Store';


const axios = require('axios')
const urlServer = '127.0.0.1:8000'

function Body() {

    const dispatch = useDispatch(); 
    dispatch(addLed(1, true));
    dispatch(addLed(2, true));
    dispatch(addLed(3, true));
    dispatch(addLed(4, true));
    // const ledNumber = useSelector((state) => state.ledNumber)
    var valueSlider = 0;

    function addLeds(ledNumber) {
        var rows = [];
        for (let i = 1; i <= ledNumber; i++) {
            rows.push(<td><Led id={i} /></td>)
        }
        return rows;
    }

    function handleSliderChange(event, value) {
        if (value > valueSlider + 10 || value < valueSlider - 10) {
            console.log(value);
            axios.get(`http://` + urlServer + `/chenillard?speed=` + value)
                .then(response => {
                    console.log(response)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            // handle acknowledgment
        }
        
        
        function directionChange() {
            if (value > valueSlider + 10 || value < valueSlider - 10) {
                console.log(value);
                axios.get(`http://` + urlServer + `/chenillard?speed=` + value)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                // handle acknowledgment
            }
            valueSlider = value;
        }valueSlider = value;
    }

    return (
        <div class="tableChenillard">
            {<div>
                <table>
                    <tr>
                        {/* A VALIDER LE ADDLED() */}
                        {/* {addLeds(ledNumber)} */}
                        <td><Led id={1} /></td>
                        <td><Led id={2} /></td>
                        <td><Led id={3} /></td>
                        <td><Led id={4} /></td>
                    </tr>
                </table>
            </div>}
            <div class="slider">
                <Slider aria-label="Speed"
                    // value={valueSlider}
                    // onChange={handleSliderChange}
                />
                {console.log(valueSlider)}
            </div>
            <div class="chenillardBtn">
                <ChenillardBtn />
                <DirectionBtn />
            </div>
        </div>
    )
}

export default Body