export default class UserInfo {
  constructor({ userNameSelector, userPostSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userPost = document.querySelector(userPostSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
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

  // обновить аватарку
  setUserInfoAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
