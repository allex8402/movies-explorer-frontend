import { handleResponse, MOVIE_URL } from './constans';

class MoviesApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    getAllMovies() {
        return fetch(this._baseUrl)
            .then((res) => handleResponse(res));
    }
}

const moviesApi = new MoviesApi(MOVIE_URL);

export default moviesApi;
