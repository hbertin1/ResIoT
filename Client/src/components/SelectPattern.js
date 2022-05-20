import { useState } from 'react'

const axios = require('axios')
const urlServer = '127.0.0.1:8000'

function SelectPattern() {
    const patterns = [
        { value: 'chenillard', label: 'CHENILLARD' },
        { value: 'full', label: 'FULL' },
        { value: 'K2000', label: 'K200' }
      ]

    const handleChange = event => {
        setSelected(event.target.value)
        axios.get(`http://` + urlServer + `/chenillard?pattern=` + event.target.value)
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