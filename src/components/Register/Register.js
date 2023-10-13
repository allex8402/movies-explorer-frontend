import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import FormField from '../FormField/FormField';
import Logo from '../Logo/Logo';
import './Register.css'
import { Link } from 'react-router-dom';

const Register = ({ onRegister, errorMessage }) => {
    const { values, handleChange, resetForm, errors, isValid } = useForm();

    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        // Проверяем, когда кнопка должна стать активной
        if (isValid && values.name && values.email && values.password) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [isValid, values]);

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!values.password || !values.email || !values.name) {
            return;
        }
        onRegister(values);
        resetForm()
    }

    return (
        <section className="register">
            <div className='register__container'>
                <Logo />
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' onSubmit={handleSubmit}
                    disabled={!isValid}>
                    <FormField
                        id='name'
                        label='Имя'
                        name='name'
                        type='text'
                        minLength='2'
                        maxLength='30'
                        required
                        autoComplete='name'
                        value={values.name || ''}
                        error={errors.name || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        id='email'
                        label='E-mail'
                        name='email'
                        type='email'
                        required
                        autoComplete='email'
                        value={values.email || ''}
                        error={errors.email || ''}
                        onChange={handleChange}
                    />
                    <FormField
                        id='password'
                        label='Пароль'
                        name='password'
                        type='password'
                        minLength='8'
                        required
                        autoComplete='password'
                        value={values.password || ''}
                        error={errors.password || ''}
                        onChange={handleChange}
                    />
                    <span className='register__error'>{errorMessage}</span>
                    <button className={`register__button ${isButtonActive ? '' : 'register__button_disabled'}`} type="submit" disabled={!isButtonActive}>
                        Зарегистрироваться
                    </button>
                    <p className="register__text">Уже зарегистрированы?
                        <Link to='/signin' className="register__link"> Войти </Link>
                    </p>
                </form>

            </div>
        </section>
    );
}

export default Register;
