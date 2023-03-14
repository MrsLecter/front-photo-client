import {
  CHANGE_NOTIF_URL,
  CHANGE_USER_EMAIL_URL,
  CHANGE_USER_NAME_URL,
  CHANGE_USER_PHONE_URL,
  REFRESH_URL,
  REFRESH_VERIFY_URL,
  REGISTRATION_URL,
  REQUEST_HEADERS_POST,
  REQUEST_HEADERS_POST_PHOTOS,
  SEND_SELFIE_URL,
  VERIFY_URL,
} from "@const";
import axios, { AxiosResponse } from "axios";
import axiosInstance from "./custom-axios-instance";
import localStorageHandler from "../components/utils/local-storage-hendler";
import {
  IInfoResponse,
  ILoginResponse,
  IPostSelfieResponse,
} from "./axios-response-types.types";

class UserService {
  public async registration({
    phone,
  }: {
    phone: string;
  }): Promise<AxiosResponse<IInfoResponse, any>> {
    try {
      const response = await axiosInstance().post<IInfoResponse>(
        REGISTRATION_URL,
        {
          phone: String(phone),
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in registration request: ", err);
      return err;
    }
  }

  public async confirm({ phone, code }: { phone: string; code: string }) {
    try {
      const response: AxiosResponse<ILoginResponse, any> = await axios({
        method: "post",
        url: VERIFY_URL,
        data: {
          phone,
          code,
        },
        withCredentials: false,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...REQUEST_HEADERS_POST,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
      return err;
    }
  }

  public async resentCode({ phone }: { phone: string }) {
    try {
      const response: AxiosResponse<ILoginResponse, any> = await axios({
        method: "post",
        url: REFRESH_VERIFY_URL,
        data: {
          phone,
        },
        withCredentials: false,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          ...REQUEST_HEADERS_POST,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in makeRegistrationRequest: ", err);
      return err;
    }
  }

  public async updateUserEmail({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().put(
        CHANGE_USER_EMAIL_URL,
        {
          email: userEmail,
        },
        {
          headers: {
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in put user email: ", err);
      return err;
    }
  }

  public async updateUserName({
    userName,
  }: {
    userName: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().put(
        CHANGE_USER_NAME_URL,
        {
          fullname: userName,
        },
        {
          headers: {
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post user name: ", err);
      return err;
    }
  }

  public async updateUserPhone({
    phone,
  }: {
    phone: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        CHANGE_USER_PHONE_URL,
        {
          phone,
        },
        {
          headers: {
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post user name: ", err);
      return err;
    }
  }

  public async postSelfie({
    phoneNumber,
    formData,
  }: {
    phoneNumber: string;
    formData: FormData;
  }): Promise<IPostSelfieResponse> {
    try {
      const response: IPostSelfieResponse = await axiosInstance().post(
        SEND_SELFIE_URL + phoneNumber,
        formData,
        {
          headers: {
            ...REQUEST_HEADERS_POST_PHOTOS,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post user selfie: ", err);
      return err;
    }
  }

  public async updateNotification({
    messageNotif,
    emailNotif,
    unsubscribeNotif,
  }: {
    messageNotif: boolean;
    emailNotif: boolean;
    unsubscribeNotif: boolean;
  }): Promise<IPostSelfieResponse> {
    try {
      const response: IPostSelfieResponse = await axiosInstance().put(
        CHANGE_NOTIF_URL,
        {
          phonenotif: Number(messageNotif),
          emailnotif: Number(emailNotif),
          unsubscribenotif: Number(unsubscribeNotif),
        },
        {
          headers: {
            ...REQUEST_HEADERS_POST,
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in post user selfie: ", err);
      return err;
    }
  }

  public async makeRefreshRequest(): Promise<
    AxiosResponse<ILoginResponse, any>
  > {
    try {
      const response: AxiosResponse<ILoginResponse, any> = await axios({
        method: "post",
        url: REFRESH_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageHandler.getRefreshToken()}`,
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in post photos request: ", err);
      return err;
    }
  }
}

const userService = new UserService();
export default userService;
