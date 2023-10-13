import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useForm from '../../hooks/useForm';
import './Profile.css';
import Header from '../Header/Header';

function Profile({ loggedIn, onUpdateUser, errorMessage, onClick }) {
    const { values, setValues, handleChange, isValid } = useForm();
    const currentUser = React.useContext(CurrentUserContext);

    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    useEffect(() => {
        setValues({
            name: currentUser.name || '',
            email: currentUser.email || '',
        });
    }, [currentUser, setValues]);

    useEffect(() => {

        // Проверяем, отличаются ли введенные данные от изначальных и являются ли они корректными
        if ((values.name !== currentUser.name || values.email !== currentUser.email) && isValid) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [currentUser, values, isValid]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            setIsUpdating(true);
            onUpdateUser({
                name: values.name,
                email: values.email
            })
                .then(() => {
                    setUpdateSuccess(true);
                })
                .catch((error) => {
                    console.error('Ошибка обновления данных:', error);
                    setUpdateSuccess(false);
                })
                .finally(() => {
                    setIsUpdating(false);
                    setTimeout(() => {
                        setUpdateSuccess(false);
                        setIsButtonActive(false);
                    }, 3000);
                });
        }
    }

    return (
        <section className='profile'>
            <Header loggedIn={loggedIn} />
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form className='profile__form' name="user" onSubmit={handleSubmit}>
                    <div className='profile__field'>
                        <label className='profile__label'>Имя</label>
                        <input
                            id='profile-name'
                            className='profile__input'
                            name='name'
                            type='text'
                            minLength='2'
                            maxLength='30'
                            required
                            autoComplete='name'
                            value={values.name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='profile__field'>
                        <label className='profile__label'>E-mail</label>
                        <input
                            id='profile-email'
                            className='profile__input'
                            name='email'
                            type='email'
                            required
                            autoComplete='email'
                            value={values.email || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <span className='register__error'>{errorMessage}</span>
                    {updateSuccess && (
                        <p className="profile__success-message">Данные успешно обновлены</p>
                    )}
                    <button
                        className={`profile__button profile__button_type_edit ${isButtonActive ? '' : 'profile__button_type_edit_disabled'}`}
                        type="submit"
                        disabled={!isButtonActive || isUpdating}
                    >
                        {isUpdating ? 'Идет сохранение...' : 'Редактировать'}
                    </button>
                    <button
                        className='profile__button profile__button_type_exit'
                        onClick={onClick}
                        type='button'
                    > Выйти из аккаунта
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Profile;