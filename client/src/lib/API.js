"use strict";

const BACKEND_URL = "http://localhost:3001";

function getJSON(httpResponsePromise) {
    return new Promise((resolve, reject) => {
        httpResponsePromise
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(json => resolve(json) )
                        .catch(err => reject({error: `Error in backend response (ok-catch): ${err}`}));
                } else {
                    response.json()
                        .then(obj => reject(obj))
                        .catch(err => reject({error: `Error in backend response (!ok-catch): ${err}`}));
                }
            })
            .catch(err => {
                reject({error: `Cannot communicate with backend: ${err}`})
            });
    });
}

const info = async (token) => {
    return getJSON(
        fetch(BACKEND_URL + '/api/user', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`}
        })
    );
}

const login = async (username, password) => {
    return getJSON(
        fetch(BACKEND_URL + '/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
    );
}

const getFilms = async (token) => {
    return getJSON(fetch(BACKEND_URL + '/api/films', {
        headers: { 'Authorization': `Bearer ${token}`}
    }))
        .then(films => {
            return films.map(f => {
                const film = {
                    id: f.id,
                    title: f.title,
                    favorite: f.favorite,
                    watchDate: f.watchDate,
                    rating: f.rating
                }
                return film;
            })
        })
        .catch((err) => { throw err; });
}

const addFilm = (token, film) => {
    return getJSON(
        fetch(BACKEND_URL + '/api/films/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        })
    );
}

const flipFavorite = (token, id) => {
    return getJSON(
        fetch(BACKEND_URL + `/api/films/${id}/favorite`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`}
        })
    );
}

const updateFilm = (token, id, filmUpdate) => {
    return getJSON(
        fetch(BACKEND_URL + `/api/films/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filmUpdate)
        })
    );
}

const deleteFilm = (token, id) => {
    return getJSON(
        fetch(BACKEND_URL + `/api/films/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}`}
        })
    );
}

const API = { info, login, getFilms, addFilm, flipFavorite, updateFilm, deleteFilm }
export default API;