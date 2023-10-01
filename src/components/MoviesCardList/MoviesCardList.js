import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'; // Исправьте имя компонента на MoviesCard
import './MoviesCardList.css';
import { cardsData } from '../../utils/constans';

function CardList() {
    return (
        <section className='cards'>
            <ul className="card__list">
                {cardsData.map((card, index) => (
                    <MoviesCard key={index} {...card} />
                ))}
            </ul>
            <button className='cards__button' type='button'>Еще</button>
        </section>
    );
}

export default CardList;