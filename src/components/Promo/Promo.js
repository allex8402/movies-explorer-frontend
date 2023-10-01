
import './Promo.css'
import landinglogo from '../../images/landing-logo.svg'


function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <img className="promo__photo" src={landinglogo} alt='Фотография' />
            </div>
        </section>
    )
}
export default Promo;