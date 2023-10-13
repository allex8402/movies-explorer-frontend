import React from 'react';
import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import FormField from '../FormField/FormField';
import Logo from '../Logo/Logo';
import '../Register/Register.css';
import './Login.css'
import { Link } from 'react-router-dom';

function Login({ onLogin, errorMessage }) {

    const { values, handleChange, resetForm, errors, isValid } = useForm();
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        // Проверяем, когда кнопка должна стать активной
        if (isValid && values.email && values.password) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [isValid, values]);
    function handleSubmit(evt) {
        evt.preventDefault();
        if (!values.password || !values.email) {
            return;
        }
        onLogin(values);
        resetForm()
    }
    return (
        <section className="register">
            <div className='register__container'>
                <Logo />
                <h2 className='register__title'>Рады видеть!</h2>
                <form className='login__form' onSubmit={handleSubmit}
                    disabled={!isValid}>
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
                        Войти
                    </button>
                    <p className="register__text">Ещё не зарегистрированы? <Link to='/signup' className="register__link">Регистрация</Link> </p>
                </form>
            </div>
        </section>
    );
}

export default Login;