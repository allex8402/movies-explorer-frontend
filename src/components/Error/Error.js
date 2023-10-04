import React from 'react';
import './error.css'

function NotFound() {
    return (
        <div className="error">
            <h1 className='error__title' >404</h1>
            <p className='error__subtitle' >Страница не найдена</p>
            <a className='error__link' href='' target='_blank' rel='noreferrer' >назад</a>
        </div>
    );
}

export default NotFound;