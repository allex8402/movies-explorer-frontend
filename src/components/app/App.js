import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../Error/Error';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../main';
import Movies from '../Movies/Movies';
import * as auth from '../../utils/auth';
import mainApi from "../../utils/MainApi";
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GuestRoute from '../GuestRoute/GuestRoute';

function App() {
  const navigate = useNavigate();
  // пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // ошибки загрузки 
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  // форма поиска
  const [selectedCheckbox, setSelectedCheckbox] = useState(localStorage.getItem("selectedCheckbox") === 'true'); // Флажок короткометражек не выбран

  const [searchKeyword, setSearchKeyword] = useState('');
  const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false);

  // фильмы
  const [allMovies, setAllMovies] = useState([]); // массив всех фильмов
  const [initialMovies, setInitialMovies] = useState([]); // массив найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]); // массив фильмов по критериям
  const [savedMovies, setSavedMovies] = useState([]); // массив сохраненных фильмы
  const [allSavedMovies, setAllSavedMovies] = useState(savedMovies)
  const [filteredMovies, setFilteredMovies] = useState(allSavedMovies);


  useEffect(() => { checkToken() }, [])


  // регистрация
  const onRegister = ({ name, email, password }) => {
    auth.registerUser({ name, email, password })
      .then(() => {
        onLogin({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        console.error('Ошибка регистрации:', err);
        if (err.message === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже зарегистрирован');
        } else {
          setErrorMessage('Переданы некорректные данные');
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }

  // авторизация
  function onLogin({ email, password }) {
    auth.loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          checkToken()
          navigate('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setErrorMessage('Неверный email или пароль')
        } else {
          setErrorMessage('Что-то пошло не так...');
        }
        setLoggedIn(false);
        localStorage.removeItem('jwt');
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }


  const location = useLocation()
  const currentPath = location.pathname


  // // получение информации о пользователе
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true);
        navigate(currentPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
    mainApi
      .getSavedMovies(jwt)
      .then((data) => {
        setLoggedIn(true);
        setSavedMovies(data)
      })
      .catch((err) => {
        console.log(err);
      })
  };


  function handleUpdateUser({ name, email }) {
    return new Promise((resolve, reject) => {
      mainApi.editProfile({
        name: name,
        email: email
      })
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          resolve(updatedUser);
        })
        .catch((err) => {

          if (err.message === 'Ошибка: 409') {
            setErrorMessage('Пользователь с таким email уже зарегистрирован');
          } else {
            setErrorMessage('Переданы некорректные данные');
          }
          reject(err);
        })
        .finally(() => {
          setTimeout(() => setErrorMessage(''), 3000);
        });
    });
  }
  // выход из аккаунта
  function onSignOut() {
    setLoggedIn(false);
    navigate("/");
    localStorage.clear();
    setInitialMovies([]);
    setSavedMovies([]);
    setFoundMovies(false);
    setSelectedCheckbox(false);
    setSearchKeyword('');

  }

  //* Поиск фильмов

  const findMovies = (movies, keyword, checkbox) => {
    const moviesКeywordSearch = movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    })
    if (checkbox) {
      return searchShortMovies(moviesКeywordSearch);
    } else {
      return moviesКeywordSearch;
    }
  }

  //* Поиск короткометражек
  const searchShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  //* Отслеживание состояния стэйтов
  useEffect(() => {
    setSearchKeyword(localStorage.getItem('searchKeyword' || ''));
    setSelectedCheckbox(localStorage.getItem('selectedCheckbox') === 'true');
    if (localStorage.getItem('foundMovies')) {
      const movies = JSON.parse(
        localStorage.getItem('foundMovies')
      );
      setInitialMovies(movies);
      if (localStorage.getItem('selectedCheckbox') === 'true') {
        setFoundMovies(searchShortMovies(movies));
      } else {
        setFoundMovies(movies);
      }
    }
  }, []);

  // поиск по критериям
  const handleSetFoundMovies = (movies, keyword, checkbox) => {
    setIsLoading(true);
    const moviesList = findMovies(movies, keyword, false);

    if (moviesList.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setInitialMovies(moviesList);
    setFoundMovies(
      checkbox ? searchShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('foundMovies', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Меняем  чекбокс на короткометражки - фильмы
  const handleChangeCheckbox = () => {

    setSelectedCheckbox(!selectedCheckbox);

    if (!selectedCheckbox) {
      setFoundMovies(searchShortMovies(initialMovies));
      if (foundMovies.length === 0) {
        setIsNotFound(true);
      }
    } else {
      setFoundMovies(initialMovies);
    }
    localStorage.setItem('selectedCheckbox', !selectedCheckbox);
  };

  //* Поиск фильмов из сохраненных ранее по ключевому слову
  function handleSearchSavedMovies(keyword) {
    if (findMovies(savedMovies, keyword, checkboxSavedMovies).length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
      setFilteredMovies(findMovies(savedMovies, keyword, checkboxSavedMovies))
      setAllSavedMovies(findMovies(savedMovies, keyword, checkboxSavedMovies))
    }
  }

  // Отслеживаем наличие сохраненных фильмов
  useEffect(() => {
    if (savedMovies.length !== 0) {
      setIsNotFound(false)
    } else {
      setIsNotFound(true)
    }
  }, [savedMovies])

  // Отслеживание состояние стэйта чекбокса сохраненные фильмы 
  useEffect(() => {
    if (localStorage.getItem('checkboxSavedMovies') === 'true') {
      setCheckboxSavedMovies(true)
      setAllSavedMovies(searchShortMovies(savedMovies))
    } else {
      setCheckboxSavedMovies(false)
      setAllSavedMovies(savedMovies)
    }
  }, [savedMovies]);

  // меняем чекбокс-сохраненные фильмы
  // function handleChangeCheckboxSavedMovies() {
  //   setCheckboxSavedMovies(!checkboxSavedMovies);

  //   if (!checkboxSavedMovies) {
  //     const shortMovies = searchShortMovies(allSavedMovies);
  //     setAllSavedMovies(shortMovies);
  //     setIsNotFound(shortMovies.length === 0);
  //   } else {
  //     setAllSavedMovies(savedMovies);
  //     setIsNotFound(savedMovies.length === 0); // 
  //   }
  // }
  function handleChangeCheckboxSavedMovies() {
    if (!checkboxSavedMovies) {
      setCheckboxSavedMovies(true)
      localStorage.setItem('checkboxSavedMovies', true);
      setAllSavedMovies(searchShortMovies(filteredMovies));
      if (searchShortMovies(filteredMovies).length === 0) {
        setIsNotFound(true)
      }
      setIsNotFound(false)
    } else {
      setCheckboxSavedMovies(false)
      localStorage.setItem('checkboxSavedMovies', false);
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      }
      setIsNotFound(false)
      setAllSavedMovies(filteredMovies)
    }
  }


  // обработка запроса по поиску
  const handleRequestMovies = (keyword) => {
    setIsNotFound(false);
    localStorage.setItem('searchKeyword', keyword); // Записываем в сторедж введенное ключевое слово
    localStorage.setItem('selectedCheckbox', selectedCheckbox); // Записываем в сторедж выставленное положение флажка
    if (allMovies.length === 0) { // если фильмов в сторедж нет, сделаем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem('allMovies', JSON.stringify(movies)); // Записываем в сторедж все полученные фильмы с BeatfilmMoviesApi
          setAllMovies(movies);
          handleSetFoundMovies(movies, keyword, selectedCheckbox) // Находим фильмы по запросу и выставленным критериям
        })
        .catch((err) => {
          setIsServerError(true)
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000)
        });
    } else {
      handleSetFoundMovies(allMovies, keyword, selectedCheckbox);
    }
  };
  //* Проверка сохранен ли фильм
  const isSavedMovies = (movie) => {
    return savedMovies.some(item => item.movieId === movie.id && item.owner === currentUser._id)
  }

  // запрос на сохранение фильма в "Сохраненные фильмы"
  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([newMovie, ...savedMovies]));
      })
      .catch((err) => {
        console.log(err);
      })
  };
  // запрос  удаление фильма "Сохраненные фильмы"
  function handleDeleteMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    const deleteCard = savedMovies.find(item => item.movieId === (movie.id || movie.movieId) && item.owner === currentUser._id)
    if (!deleteCard) return
    mainApi.deleteMovie(deleteCard._id, jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(c => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} route="/" />
              <Main loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              <Footer />
            </>
          } />
          <Route exact path="/movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                movies={foundMovies}
                searchKeyword={searchKeyword}
                isLoading={isLoading}
                checked={selectedCheckbox}
                onCheckbox={handleChangeCheckbox}
                savedMovies={savedMovies}
                isSavedMovies={isSavedMovies}
                onSaveMovie={handleSaveMovie}
                isNotFound={isNotFound}
                isServerError={isServerError}
                onDeleteMovie={handleDeleteMovie}
                onSubmit={handleRequestMovies}
              />
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header loggedIn={loggedIn} />
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                movies={allSavedMovies}
                savedMovies={savedMovies}
                isSavedMovies={isSavedMovies}
                checked={checkboxSavedMovies}
                onCheckbox={handleChangeCheckboxSavedMovies}
                isNotFound={isNotFound}
                onDeleteMovie={handleDeleteMovie}
                onSubmit={handleSearchSavedMovies}
              />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              onUpdateUser={handleUpdateUser}
              onClick={onSignOut}
              errorMessage={errorMessage} />} />
          <Route path="/signup" element={<GuestRoute component={Register} onRegister={onRegister} errorMessage={errorMessage} loggedIn={loggedIn} />} />
          <Route path="/signin" element={<GuestRoute component={Login} onLogin={onLogin} errorMessage={errorMessage} loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
