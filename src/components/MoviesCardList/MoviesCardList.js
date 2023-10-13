import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useWSize } from "../../hooks/useWSize";
import {
    MAX_WIDTH_1280,
    MIDDLE_WIDTH_768,
    MIN_WIDTH_480,
    INITIAL_CARDS_1280,
    INITIAL_CARDS_768,
    INITIAL_CARDS_768s,
    INITIAL_CARDS_480,
    MORE_CARDS_3,
    MORE_CARDS_2,
    MORE_CARDS_1
} from '../../utils/constans'

const MoviesCardList = ({ movies, isNotFound, isServerError, isMoviesPage, onDeleteMovie, onSaveMovie, isSavedMovies }) => {
    const windowWidth = useWSize();
    const [initialCards, setInitialCards] = useState({});
    const [moreCards, setMoreCards] = useState({});

    useEffect(() => {
        if (windowWidth >= MAX_WIDTH_1280) {
            setInitialCards(INITIAL_CARDS_1280);
            setMoreCards(MORE_CARDS_3);
        }
        if (windowWidth < MAX_WIDTH_1280 && windowWidth >= MIDDLE_WIDTH_768) {
            setInitialCards(INITIAL_CARDS_768);
            setMoreCards(MORE_CARDS_2);
        }
        if (windowWidth < MIDDLE_WIDTH_768 && windowWidth >= MIN_WIDTH_480) {
            setInitialCards(INITIAL_CARDS_768s);
            setMoreCards(MORE_CARDS_2);
        }
        if (windowWidth < MIN_WIDTH_480) {
            setInitialCards(INITIAL_CARDS_480);
            setMoreCards(MORE_CARDS_1);
        }
    }, [windowWidth])

    function handleMoreButtonClick() {
        setInitialCards(initialCards + moreCards);
    }

    return (
        <section className='cards'>
            {isMoviesPage ? (
                <>
                    {(isNotFound || isServerError) && (
                        <p className='cards__message'>
                            {isNotFound ? 'Ничего не найдено.' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'}
                        </p>
                    )}

                    {movies.length > 0 && (
                        <ul className='cards__list'>
                            {movies.slice(0, initialCards).map((movie, i) => {
                                return (
                                    <MoviesCard
                                        movie={movie}
                                        key={movie.id}
                                        onDeleteMovie={onDeleteMovie}
                                        onSaveMovie={onSaveMovie}
                                        isSavedMovies={isSavedMovies}
                                        isMoviesPage={isMoviesPage}
                                    />
                                );
                            })}
                        </ul>
                    )}
                    <button
                        type='button'
                        onClick={handleMoreButtonClick}
                        className={
                            movies.length <= 7 || initialCards >= movies.length
                                ? 'cards__button_hidden'
                                : 'cards__button'
                        }
                    >
                        Ещё
                    </button>
                </>
            ) : (
                <>
                    {(isNotFound || isServerError) && (
                        <p className='cards__message'>
                            {isNotFound ? 'Ничего не найдено.' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'}
                        </p>
                    )}

                    {movies.length > 0 && (
                        <ul className='cards__list'>
                            {movies.map((movie) => {
                                return (
                                    <MoviesCard
                                        movie={movie}
                                        key={movie.movieId}
                                        onDeleteMovie={onDeleteMovie}
                                        isSavedMovies={isSavedMovies}
                                        isMoviesPage={isMoviesPage}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </>
            )}
        </section>
    )
}
export default MoviesCardList;
