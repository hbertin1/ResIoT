import { useSelector } from 'react-redux'

const axios = require('axios')
const urlServer = '//127.0.0.1:8000'

function DirectionBtn() {

    const chenillardDirection = useSelector((state) => state.chenillard.direction)
    //const colorChenillardBtn = useSelector((state) => state.chenillard.colorChenillardBtn)

    //Afficher sur le bouton la direction : droite ou gauche

    function directionChenillard() {
        var direction;
        if (chenillardDirection) direction = `false`
        else direction = 'true'

        axios.get(`http://` + urlServer + `/chenillard?&direction=` + direction)
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    return(
        <button
            onClick={() => directionChenillard()}>
            { chenillardDirection? "Droite":"Gauche"}

        </button>
    )
}

export default DirectionBtn