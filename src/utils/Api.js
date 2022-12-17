class Api {
  // добавить конструктор
  constructor({ baseURL, headers }) {
    this.url = baseURL;
    this.headers = headers;
    console.log('api', this.url, this.headers);
  }

  // проверить статуст запроса
  checkResolveStatus(resolve) {
    if (resolve.ok) {
      return resolve.json();
    } else {
      return Promise.reject('Ошибка запроса!');
    }
  }

  //  получить данные пользователя
  getUserInfo() {
    return fetch(`${this.url}/users/me`, { headers: this.headers })
      .then((res) => {
        return this.checkResolveStatus(res);
      })
      .then((info) => {
        console.log(info);
        // return info;
      })
      .catch((err) => console.log(err));
  }

  // получение начальных карточек мест
  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers })
      .then((res) => {
        return this.checkResolveStatus(res);
      })
      .then((cards) => {
        console.log(cards);
      })
      .catch((err) => console.log(err));
  }
}

export default Api;
