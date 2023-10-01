import React, { useState } from 'react';

import './MoviesCard.css';


function Card({ imageUrl, title }) {
    return (
        <li className="card">
            <img className="card__img" src={imageUrl} alt={title} />
            <div className="card-content">
                <div className="card-label">{title}</div>

                <button className='card__button card__button_saved' type="button" />
                {/* :
                <button className='card__button' type='button' />
                :
                <button className='card__button card__button_delete' type='button' /> */}
            </div>
            <div className='card__time'>{1.42}</div>
        </li>
    );
}

export default Card;
