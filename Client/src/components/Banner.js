import '../styles/Banner.css'
import logo_esir from '../assets/logo_esir.png'

function Banner() {
    const title = "Chenillard Manager"
    return (
        <div className='knx-banner'>
            {/* <img src={logo_esir} alt='Logo ESIR' className='knx-logo' /> */}
            <h1 knx-title>{title}</h1>
        </div>
    )
}

export default Banner