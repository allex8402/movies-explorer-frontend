import './NavTab.css';

const NavTab = () => {
    return (
        <nav className='navtab'>
            <ul className='navtab__menu'>
                <li className='navtab__menu-item'>
                    <a className="navtab__link" href='#about-project'>О проекте</a>
                </li>
                <li className='navtab__menu-item'>
                    <a className='navtab__link' href='#techs'>Технологии</a>
                </li>
                <li className='navtab__menu-item'>
                    <a className='navtab__link' href='#student'>Студент</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavTab;