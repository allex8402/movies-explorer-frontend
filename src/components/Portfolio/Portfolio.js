import './Portfolio.css'

function Portfolio() {

    return (
        <section className="portfolio">
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__links'>
                <li className='portfolio__link-container'>
                    <a className='portfolio__link' rel='noreferrer' href='https://github.com/allex8402/russian-travel' target='_blank'>
                        Статичный сайт
                        <span>↗</span>
                    </a>
                </li>
                <li className='portfolio__link-container'>
                    <a className='portfolio__link' rel='noreferrer' href='https://github.com/allex8402/mesto' target='_blank'>
                        Адаптивный сайт
                        <span>↗</span>
                    </a>
                </li>
                <li className='portfolio__link-container'>
                    <a className='portfolio__link' rel='noreferrer' href='https://github.com/allex8402/react-mesto-api-full-gha' target='_blank'>
                        Одностраничное приложение
                        <span>↗</span>
                    </a>
                </li>
            </ul>
        </section>
    )
}
export default Portfolio;
