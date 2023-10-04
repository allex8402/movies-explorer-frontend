import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const SavedMovies = ({ movies, onDeleteMovie, isSavedMovies, onCheckbox, onSubmit, checked, isNotFound,
    savedMovies, loggedIn, setLoggedIn }
) => {
    return (
        <main className='saved-movies'>
            <Header loggedIn={loggedIn} />
            <SearchForm
            />
            <MoviesCardList />
            <Footer />
        </main>
    )
}

export default SavedMovies;