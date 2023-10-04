import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

const Header = ({ loggedIn }) => {
    const location = useLocation();
    const headerClass = location.pathname === '/' ? 'header header-main' : 'header header-other';

    return (
        <header className={`header ${headerClass}`}>
            <Logo />
            <Navigation loggedIn={loggedIn} />
        </header>
    )
}

export default Header;