import React from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import seacher from '../../images/seacher.svg'

function SearchForm() {
    return (
        <section className='search'>
            <form className='search__form'>
                <label className='search__input-label'>
                    <img className='search__icon search__icon_place_input' src={seacher} alt='лупа' />
                </label>
                <input className='search__input' type="text" placeholder="Фильм"></input>
                {/* <span className='search__form-error'>{ }</span> */}
                <button className='search__button' type='submit'>Найти</button>
                <div className="search-divider"></div>
                <div className="toggle-switch-label">
                    <FilterCheckbox />
                    <span className="toggle-label">Короткометражки</span>

                </div>
            </form>
        </section >
    )
}
export default SearchForm;