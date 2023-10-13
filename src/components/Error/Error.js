import React from 'react';
import { Link } from 'react-router-dom';
import './error.css'

function NotFound() {
    return (
        <div className="error">
            <h1 className='error__title' >404</h1>
            <p className='error__subtitle' >Страница не найдена</p>
            <Link to='/' className='error__link' rel='noreferrer'>Назад</Link>

        </div>
    );
}

export default NotFound;