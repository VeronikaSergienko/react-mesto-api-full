const { NODE_ENV } = process.env;
const BASE_URL = NODE_ENV === 'development' ? 'http://localhost:4444' : 'https://api.vss.students.mesto.nomoredomains.monster';

class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      // console.log(res);
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _getToken() {
    return JSON.parse(localStorage.getItem('jwt'));
  };


  // получение данных о пользователе
  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
      // headers: this._headers,
    }).then(this._checkResponse);
  }

  // публичный метод для получения массива карточек с сервера
  getInitialCardsApi() {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
      // headers: this._headers,
    }).then(this._checkResponse);
  }

  // отправка обновлённых данных о пользователе на сервер
  patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
      // headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  //  отправка ссылки на новый аватар
  patchUserAvatar({ avatar: link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
      // headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  // запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // добавление и удаление лайков
  toggleLikes(cardId, isLikes) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLikes ? "DELETE" : "PUT",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // метод для отправки данных карты
  postCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this._getToken()}`,
        "Content-Type": "application/json",
      },
      // headers: this._headers,
      body: JSON.stringify({
        name: item.title,
        link: item.link,
      }),
    }).then(this._checkResponse);
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  authorize({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    } 
    }).then(this._checkResponse);
  }

}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mestoAuth = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
