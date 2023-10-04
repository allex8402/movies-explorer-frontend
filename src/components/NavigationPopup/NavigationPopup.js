import './NavigationPopup.css';
import { NavLink, } from 'react-router-dom';
import ProfileNav from '../ProfileNav/ProfileNav'
import React, { useState } from 'react';

const NavigationPopup = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className={`popup ${isPopupOpen ? 'popup_is-active' : ''}`}>
            <div className='popup__overlay'>
                <div className='popup__container'>
                    <button type='button' className='popup__close' onClick={togglePopup} />
                    <ul className='popup__list' >
                        <li className='popup__item'>
                            <NavLink exact to='/' className='popup__link' activeClassName='popup__link_active'>
                                Главная
                            </NavLink>
                        </li>
                        <li className='popup__item'>
                            <NavLink to='/movies' className='popup__link' activeClassName='popup__link_active'>
                                Фильмы
                            </NavLink>
                        </li>
                        <li className='popup__item'>
                            <NavLink to='/saved-movies' className='popup__link' activeClassName='popup__link_active'>
                                Сохранённые фильмы
                            </NavLink>
                        </li >
                    </ul>
                    {/* <Link to='/profile'>
                        <button className='popup__button' type='button' >Аккаунт</button>
                    </Link> */}
                    <ProfileNav className='popup__button ' />
                </div>
            </div>
        </div>
    )
};

export default NavigationPopup;