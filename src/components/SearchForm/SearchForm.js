import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import seacher from '../../images/seacher.svg'
import { useState, useEffect } from 'react';

function SearchForm({ onSubmit, checked, defaultValue, onCheckbox }) {
    const [errorText, setErrorText] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setKeyword(defaultValue)
    }, [defaultValue])

    const handleChange = (evt) => {
        setKeyword(evt.target.value);
        setIsFormValid(evt.target.closest('form').checkValidity());
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (keyword) {
            onSubmit(keyword);
        } else {
            return setErrorText('Нужно ввести ключевое слово')
        }
    };

    return (
        <section className='search'>
            <form className='search__form' noValidate onSubmit={handleSubmit}>
                <label className='search__input-label'>
                    <img className='search__icon search__icon_place_input' src={seacher} alt='лупа' />
                </label>
                <input className='search__input' type="text" placeholder="Фильм" required onChange={handleChange}
                    value={keyword || ''}></input>
                <span className='search__form-error'>{!isFormValid && errorText}</span>
                <button className='search__button' type='submit'>Найти</button>
                <div className="search-divider"></div>
                <div className="toggle-switch-label">
                    <FilterCheckbox checked={checked} onCheckbox={onCheckbox} />
                    <span className="toggle-label">Короткометражки</span>

                </div>
            </form>
        </section >
    )
}
export default SearchForm;
