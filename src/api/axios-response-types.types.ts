import { IPhotoObject } from "@/components/types/commonTypes";

export interface IInfoResponse {
  message: string;
  status: number;
}

export interface ILoginResponse {
  accessToken: string;
  avatarLink: string;
  message: string;
  notificationSettings: {
    email: 0 | 1;
    textMessages: 0 | 1;
    unsubscribe: 1 | 0;
  };
  phoneNumber: string;
  refreshToken: string;
  status: number;
  userEmail: string;
  userName: string;
}

export interface IAlbumsResponse {
  message: IPhotoObject[];
  status: number;
}

export interface IPostSelfieResponse {
  message: string;
  selfie: string;
  status: number;
}

export interface IPriceResponse {
  message: string;
  status: number;
}
