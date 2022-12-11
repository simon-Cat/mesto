export default class UserInfo {
  constructor({ userNameSelector, userPostSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userPost = document.querySelector(userPostSelector);
  }
  // вернуть объект данных о пользователе
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userPost: this._userPost.textContent,
    };
  }
  // вставить новые данные о пользователе
  // на страницу
  setUserInfo(name, post) {
    this._userName.textContent = name;
    this._userPost.textContent = post;
  }
}
