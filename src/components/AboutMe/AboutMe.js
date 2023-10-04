import photo from '../../images/photo.jpeg'
import './AboutMe.css'

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Александр</h3>
                    <h4 className="about-me__job">Фронтенд-разработчик, 30 лет</h4>
                    <p className="about-me__text">Я родился и живу в не большом провинциальном городке на западе Иркутской Области, закончил местный
                        агро-техникум по специальности техник-электрик. По профессии ни когда не работал, потом учто обрел познания и опыт в работе
                        Автозаправочных станций. Последнии 10 лет управляю одной из таковых. Люблю музыку, активные виды отдыха, играю на гитаре
                        Недавно решил попробовать что то новое. Привлекла веб- разработка. Пока нравится</p>
                    <a className='about-me__link' href='https://github.com' target='_blank' rel='noreferrer'>Github</a>
                </div>
                <div className="about-me__photo-container">
                    <div className="about-me__photo"></div>
                </div>
            </div>
        </section>
    )
}
export default AboutMe;