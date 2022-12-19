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
    return fetch(`${this.url}/cards`, { headers: this.headers })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .then((cards) => {
        return cards;
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

  // добавить новую краточку
  sendNewCard() {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: 'Dubai', link: 'https://example.com' }),
    })
      .then((res) => {
        return this._checkResponseStatus(res);
      })
      .then((newCardInfo) => {
        console.log(newCardInfo);
      })
      .catch((err) => console.log(err));
  }
}
