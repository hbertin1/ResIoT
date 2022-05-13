import { useSelector } from 'react-redux'

function DisplayChenillardBtn() {

    const isChenillardOn = useSelector((state) => state.chenillard.state)
    const colorChenillardBtn = useSelector((state) => state.chenillard.colorChenillardBtn)

    return(
        <button
            style={{ background: {colorChenillardBtn} }} 
            onClick={sendStartSignalChenillard(isChenillardOn)}>
            {isChenillardOn ? "Start the Chenillard":"Stop the Chenillard"}
            {console.log(colorChenillardBtn)}
        </button>
    )
}

export default DisplayChenillardBtn