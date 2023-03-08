class LocalStorageHandler {
  public setUserData({
    photoPrice,
    notificationSettings,
    userEmail,
    userName,
    avatarLink,
    accessToken,
    refreshToken,
  }: ILocalStorageData) {
    const userData = localStorage.getItem("@photodrop-user");
    if (userData) {
      const userDataObject = JSON.parse(userData);
      userDataObject.accessToken = accessToken;
      userDataObject.refreshToken = refreshToken;
      userDataObject.avatarLink = avatarLink || "";
      userDataObject.userName = userName;
      userDataObject.userEmail = userEmail;
      userDataObject.notificationSettings = {
        textMessages: notificationSettings.textMessages,
        emailing: notificationSettings.emailing,
        unsubscribe: notificationSettings.unsubscribe,
      };
      userDataObject.photoPrice = photoPrice;
      localStorage.setItem("@photodrop-user", JSON.stringify(userDataObject));
    }
  }

  public updateTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    const userData = localStorage.getItem("@photodrop-user");
    if (userData) {
      const userDataObject = JSON.parse(userData);
      userDataObject.accessToken = accessToken;
      userDataObject.refreshToken = refreshToken;
      localStorage.setItem("@photodrop-user", JSON.stringify(userDataObject));
    }
  }

  public updateUserAvatar({ avatar }: { avatar: string }) {
    const userData = localStorage.getItem("@photodrop-user");
    if (userData) {
      const userDataObject = JSON.parse(userData);
      userDataObject.avatarLink = avatar;
      localStorage.setItem("@photodrop-user", JSON.stringify(userDataObject));
    }
  }

  public setUserPhone({ phone }: { phone: string }) {
    const userData = localStorage.getItem("@photodrop-user");
    if (userData) {
      const userDataObject = JSON.parse(userData);
      userDataObject.phoneNumber = phone;
      localStorage.setItem("@photodrop-user", JSON.stringify(userDataObject));
    } else {
      const userDataInit = {
        accessToken: "",
        refreshToken: "",
        avatarLink: "",
        userName: "",
        phoneNumber: phone,
        userEmail: "",
        notificationSettings: {
          textMessages: 0,
          email: 0,
          unsubscribe: 0,
        },
        photoPrice: 0,
      };
      localStorage.setItem("@photodrop-user", JSON.stringify(userDataInit));
    }
  }

  public getUserData(): ILocalStorageData | undefined {
    const userData = localStorage.getItem("@photodrop-user");

    if (userData) {
      const userDataObject = JSON.parse(userData);
      return userDataObject;
    }
  }

  public getAccessToken() {
    const userData = localStorage.getItem("@photodrop-user");

    if (userData) {
      const userDataObject = JSON.parse(userData);
      return userDataObject.accessToken;
    }
  }

  public getRefreshToken() {
    const userData = localStorage.getItem("@photodrop-user");

    if (userData) {
      const userDataObject = JSON.parse(userData);
      return userDataObject.refreshToken;
    }
  }

  public isUserExist() {
    return !!localStorage.getItem("@photodrop-user");
  }

  public deleteUsersData() {
    localStorage.removeItem("@photodrop-user");
  }

  public changeName(newName: string) {
    const userData = localStorage.getItem("@photodrop-user");

    if (userData) {
      const oldUserData = JSON.parse(userData);
      oldUserData.userName = newName;
      localStorage.setItem("@photodrop-user", JSON.stringify(oldUserData));
    }
  }

  public changeEmail(newEmail: string) {
    const userData = localStorage.getItem("@photodrop-user");

    if (userData) {
      const oldUserData = JSON.parse(userData);
       oldUserData.userEmail = newEmail;
      localStorage.setItem("@photodrop-user", JSON.stringify(oldUserData));
    }
  }
}

const localStorageHandler = new LocalStorageHandler();

export default localStorageHandler;

interface ILocalStorageData {
  accessToken: string;
  refreshToken: string;
  avatarLink: string;
  userName: string | null;
  phoneNumber?: string;
  userEmail: string | null;
  notificationSettings: {
    textMessages: number;
    emailing: number;
    unsubscribe: number;
  };
  photoPrice: number;
}
