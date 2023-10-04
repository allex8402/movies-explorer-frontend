import React, { useState, useEffect } from 'react';
import './Footer.css'

function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__info'>
                <p className='footer__copyright'> &copy; {currentYear}</p>
                <div className='footer__links'>
                    <a className='footer__link' href='https://practicum.yandex.ru' rel='noreferrer' target='_blank'>Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com/allex8402' rel='noreferrer' target='_blank'>Github</a>
                </div>
            </div >
        </footer>
    );
}

export default Footer;