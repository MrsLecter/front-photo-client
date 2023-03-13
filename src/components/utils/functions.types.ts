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
