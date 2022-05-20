import Select from 'react-select'
import { useState } from 'react'

const axios = require('axios')
const urlServer = '127.0.0.1:8000'

function SelectPattern() {
    const patterns = [
        { value: 'chenillard', label: 'CHENILLARD' },
        { value: 'DoubleLed', label: 'DOUBLE' },
        { value: 'Full', label: 'FULL' },
        { value: 'K2000', label: 'K200' }
      ]

    const handleChange = event => {
        console.log(event.target.value)
        setSelected(event.target.value)
        axios.get(`http://` + urlServer + `/chenillard?pattern=` + selected)
        .then(response => {
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    // handle acknowledgment
    };

    const [selected, setSelected] = useState(patterns[0].value);

    return (<select value={selected} onChange={handleChange} >
            {patterns.map(pattern =>(
                <option key={pattern.value} value={pattern.value}>
                    {pattern.label}
                </option>
            ))}
            </select>);
}

export default SelectPattern;