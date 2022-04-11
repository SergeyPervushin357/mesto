export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, avatarSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(title, job, avatar) {
    this._name.textContent = title;
    this._job.textContent = job;
    this._avatar.src = avatar;
  }
}