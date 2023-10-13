export class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка:${res.status}`);
    }

    _getHeaders() {
        const jwt = localStorage.getItem('jwt');

        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    //загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        })
            .then(res => this._handleResponse(res))
    }

    // Редактирование профиля
    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(res => this._handleResponse(res))
    }

    // Сохранение фильма
    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                movieId: movie.id,
                nameRU: movie.nameRU || 'Нет данных',
                nameEN: movie.nameEN || 'Нет данных',
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            }),
        }).then(res => this._handleResponse(res))
    }

    // Получение всех сохраненных фильмов пользователя
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._getHeaders(),
        }).then(res => this._handleResponse(res))
    };

    // Удаляем фильм пользователя
    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        }).then(res => this._handleResponse(res))
    };


} //закрытие класса

const mainApi = new MainApi({
    baseUrl: 'https://api.kate0109.nomoredomainsicu.ru',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default mainApi;