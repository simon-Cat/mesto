class Api {
  // добавить конструктор
  constructor({ baseURL, headers }) {
    this.url = baseURL;
    this.headers = headers;
    console.log('api', this.url, this.headers);
  }

  //  получить данные пользователя
  getUserInfo() {
    return fetch(this.url, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject('Ошибка запроса!');
        }
      })
      .then((info) => {
        return info;
      })
      .catch((err) => console.log(err));
  }
}

export default Api;
