import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import ProfileNav from '../ProfileNav/ProfileNav'
import NavigationPopup from '../NavigationPopup/NavigationPopup';

const Navigation = ({ loggedIn }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    return (
        <>
            {loggedIn ? (
                <>
                    <div className='navigation'>
                        <nav className='navigation__links'>
                            <NavLink to='/movies' className='navigation__link' >Фильмы</NavLink>
                            <NavLink to='/saved-movies' className='navigation__link' >Сохранённые фильмы</NavLink>
                        </nav>
                        <ProfileNav className='navigation__icon ' />
                    </div>
                    <button className='navigation-nav' type='button' onClick={togglePopup} />
                </>
            ) : (
                <nav className='navigation'>
                    <Link to='/signup' className='navigation__link'>Регистрация</Link>
                    <Link to='/signin'>
                        <button className='navigation__button' type='button'>
                            Войти
                        </button>
                    </Link>
                </nav>
            )
            }
            {isPopupOpen && <NavigationPopup />}
        </>
    )
}

export default Navigation;
