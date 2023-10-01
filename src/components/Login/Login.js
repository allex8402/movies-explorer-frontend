import FormField from '../FormField/FormField';
import Logo from '../Logo/Logo';
import '../Register/Register.css';
import './Login.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <section className="register">
            <div className='register__container'>
                <Logo />
                <h2 className='register__title'>Рады видеть!</h2>
                <form className='login__form'>
                    <FormField
                        id='email'
                        label='E-mail'
                        name='email'
                        type='email'
                        required
                        autoComplete='email'
                        // value={values.email || ''}
                        // error={errors.email || ''}
                        // onChange={handleChange}
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
                    // value={values.password || ''}
                    // error={errors.password || ''}
                    // onChange={handleChange}
                    />
                </form>
                <button className="register__button" type="submit">Войти</button>

                <p className="register__text">Ещё не зарегистрированы? <Link to='/signup' className="register__link">Регистрация</Link> </p>
            </div>
        </section>
    );
}

export default Login;