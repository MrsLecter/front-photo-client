export interface CountriesType {
  id: number;
  name: string;
  currency: string;
  phone: number;
  capital: string;
  code: string;
  code3: string;
  number: number;
}

export interface ILoginCredentials {
  accessToken: string;
  refreshToken: string;
  avatarLink: string;
  userName: string;
  phoneNumber: string;
  userEmail: string;
  notificationSettings: {
    textMessages: number;
    email: number;
    unsubscribe: number;
  };
  photoPrice: number;
}
