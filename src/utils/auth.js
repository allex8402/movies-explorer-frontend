import { BASE_URL } from "./constans";

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

// регистрация 
export function registerUser({ name, email, password }) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    }).then(handleResponse);

}
// авторизация 
export function loginUser({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
}

export function getToken(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(handleResponse);
}