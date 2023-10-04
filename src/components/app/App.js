import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../Error/Error';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../main';
import Movies from '../Movies/Movies';


function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/movies" element={<Movies loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/profile" element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </Router>
  );
}
export default App;





