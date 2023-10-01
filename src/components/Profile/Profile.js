import './Profile.css'
import Header from '../Header/Header';
function Profile({ loggedIn, setLoggedIn }) {
    return (
        <section className='profile'>
            <Header loggedIn={loggedIn} />
            <h3 className='profile__title'>Привет, {'name'}!</h3>
            <div className='profile__container'>
                <form
                    className='profile__form'
                    noValidate>
                    <div className='profile__field'>
                        <label className='profile__label'>Имя</label>
                        <input
                            id='profile-name'
                            className='profile__input'
                            name='name'
                            type='text'
                            minLength='2'
                            maxLength='30'
                            required />
                    </div>

                    <div className='profile__field'>
                        <label className='profile__label'>E-mail</label>
                        <input
                            id='profile-email'
                            className='profile__input'
                            name='email'
                            type='email'
                            required
                            pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                        />
                    </div>

                    <button
                        className='profile__button profile__button_type_edit'
                        type='button'
                    >Редактировать
                    </button>
                    <button
                        className='profile__button profile__button_type_exit'
                        type='button'

                    > Выйти из аккаунта
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Profile;
