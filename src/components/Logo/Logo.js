import { Link } from 'react-router-dom';
import headerlogo from '../../images/headerlogo.svg'

const Logo = () => {
    return (
        <Link to='/'>
            <img className='logo' src={headerlogo} alt='Логотип' />
        </Link>
    )

}

export default Logo;