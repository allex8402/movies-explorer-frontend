import FormField from '../FormField/FormField';
import Logo from '../Logo/Logo';
import './Register.css'
import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="register">
            <div className='register__container'>
                <Logo />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form'>
                    <FormField
                        id='name'
                        label='Имя'
                        name='name'
                        type='text'
                        minLength='2'
                        maxLength='30'
                        required
                        autoComplete='name'
                    />
                    <FormField
                        id='email'
                        label='E-mail'
                        name='email'
                        type='email'
                        required
                        autoComplete='email'
                        pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                    />
                    <FormField
                        id='password'
                        label='Пароль'
                        name='password'
                        type='password'
                        minLength='8'
                        required
                        autoComplete='password'
                    />
                </form>
                <button className="register__button" type="submit">Зарегистрироваться</button>
                <p className="register__text">Уже зарегистрированы?
                    <Link to='/signin' className="register__link"> Войти </Link>
                </p>
            </div>
        </section>
    );
}

export default Register;