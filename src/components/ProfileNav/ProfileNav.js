import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/icon__COLOR_icon-main.svg';
import './ProfileNav.css'

const ProfileNav = ({ className }) => {
    return (
        <nav className={className} >
            <Link to='/profile'>
                <button className='navigation__btn' type='button'>Аккаунт</button>
            </Link>
            <Link to='/profile' className='navigation__logo'>
                <img src={icon} alt='Логотип' />
            </Link>
        </nav>
    );
};

export default ProfileNav;