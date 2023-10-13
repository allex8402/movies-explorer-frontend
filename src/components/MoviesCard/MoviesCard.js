import React from 'react';
import { convertDuration } from '../../utils/constans';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ movie, isMoviesPage, onSaveMovie, onDeleteMovie, isSavedMovies }) => {
    const location = useLocation();

    const renderMovieImage = () => {
        if (location.pathname === '/movies') {
            return (
                <img
                    src={`https://api.nomoreparties.co/${movie.image.url}`}
                    alt={movie.nameRU}
                    className='card__img'
                />
            );
        }
        if (location.pathname === '/saved-movies') {
            return (
                <img
                    src={movie.thumbnail}
                    alt={movie.nameRU}
                    className='card__img'
                />
            );
        }
        return null;
    }

    const handleSaveMovie = () => {
        onSaveMovie(movie);
    }

    const handleDeleteMovie = () => {
        onDeleteMovie(movie);
    }

    const renderActionButton = () => {
        if (isMoviesPage) {
            return (
                <button
                    className={`card__button ${isSavedMovies(movie) ? 'card__button_saved' : ''}`}
                    onClick={isSavedMovies(movie) ? handleDeleteMovie : handleSaveMovie}
                    type='button'
                />
            );
        } else {
            return (
                <button
                    className='card__button card__button_delete'
                    onClick={handleDeleteMovie}
                    type='button'
                />
            );
        }
    }

    return (
        <li className='card'>
            <a
                href={movie.trailerLink}
                className='card__img'  // ?
                target='_blank'
                rel='noreferrer'
            >
                {renderMovieImage()}
            </a>
            <div className='card-content'>
                <span className='card-label'>{movie.nameRU}</span>
                {renderActionButton()}
            </div>
            <span className='card__time'>{convertDuration(movie.duration)}</span>
        </li>
    )
}

export default MoviesCard;