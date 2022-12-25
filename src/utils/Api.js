export default class Api {
  constructor({ baseURL, headers }) {
    this.url = baseURL;
    this.headers = headers;
  }

  // проверить статус запроса
  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Ошибка запроса!');
    }
  }

  // получить данные пользователя
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // получение начальных карточек мест
  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // обновить данные порфиля
  updateProfileInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // обновить аватарку
  updateProfileAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // добавить новую краточку
  sendNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // отправить лайк
  sendLike(id, likes) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ likes }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }

  // удалить лайк
  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .catch((err) => console.log(err));
  }
}
