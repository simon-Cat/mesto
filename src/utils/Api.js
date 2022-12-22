export default class Api {
  // добавить конструктор
  constructor({ baseURL, headers }) {
    this.url = baseURL;
    this.headers = headers;
  }

  // проверить статуст запроса
  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Ошибка запроса!');
    }
  }

  //  получить данные пользователя
  // async getUserInfo() {
  //   const response = await fetch(`${this.url}/users/me`, {
  //     method: 'GET',
  //     headers: this.headers,
  //   });
  //   const data = await response.json();
  //   return data;
  // }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
    // .then((data) => {
    //   return data;
    // });
  }

  // получение начальных карточек мест
  getInitialCards() {
    return (
      fetch(`${this.url}/cards`, { headers: this.headers })
        .then((res) => {
          // return this._checkResponseStatus(res);
          return res.json();
        })
        // .then((cards) => {
        //   return cards;
        // })
        .catch((err) => console.log(err))
    );
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
  updateProfileAvatar(url) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar: url }),
    })
      .then((res) => res.json())
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
        // return this._checkResponseStatus(res);
        return res.json();
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
        return res.text();
      })
      .then((data) => {
        console.log(data);
      });
  }

  // отправить лайк
  sendLike(id, likes) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ likes }),
    }).then((res) => {
      return res.json();
    });
  }

  // удалить лайк
  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return res.json();
    });
  }
}
