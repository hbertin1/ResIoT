import * as React from 'react';
import { useSelector } from 'react-redux';
import Store from './Store';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const axios = require('axios')
const urlServer = '127.0.0.1:8000'

const Input = styled(MuiInput)`
  width: 42px;
`;

function SliderSpeed() {

    const [value, setValue] = React.useState(30);
    const valueSlider = useSelector((state) => state.chenillard.speed);

    // if(valueSlider-10 <= value || valueSlider+10 >= value ) {
    //     setValue(valueSlider);
    // }

    const handleSliderChange = (event, newValue) => {
        sendSpeedChenillard(newValue);
    };

    const handleInputChange = (event) => {
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
        sendSpeedChenillard(event.target.value === '' ? '' : Number(event.target.value))
    };

    const handleBlur = () => {
        if (value < 0) {
        //   setValue(0);
        sendSpeedChenillard(0)
        } else if (value > 100) {
            console.log(value)
        //   setValue(100);
        sendSpeedChenillard(100)
        }
    };

    function sendSpeedChenillard(speed) {
        setValue(speed);
        if (value > valueSlider + 5 || value < valueSlider - 5) {
            axios.get(`http://` + urlServer + `/chenillard?speed=` + speed)
                .then(response => {
                    console.log(response)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            // handle acknowledgment
        }
    }

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                Speed
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default SliderSpeed