import {
  CHANGE_NOTIF_URL,
  CHANGE_USER_EMAIL,
  CHANGE_USER_NAME,
  CHANGE_USER_PHONE,
  REFRESH_URL,
  REGISTRATION_ENDPOINT,
  REQUEST_HEADERS_POST,
  REQUEST_HEADERS_POST_PHOTOS,
  SEND_SELFIE_URL,
  VERIFY_ENDPOINT,
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
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        REGISTRATION_ENDPOINT,
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
      return err.code;
    }
  }

  public async confirm({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }): Promise<ILoginResponse> {
    try {
      const response: ILoginResponse = await axiosInstance().post(
        VERIFY_ENDPOINT,
        {
          phone,
          code,
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
      console.error("An error occured in post confirm code: ", err);
      return err.code;
    }
  }

  public async updateUserEmail({
    userEmail,
  }: {
    userEmail: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().put(
        CHANGE_USER_EMAIL,
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
      return err.code;
    }
  }

  public async updateUserName({
    userName,
  }: {
    userName: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().put(
        CHANGE_USER_NAME,
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
      return err.code;
    }
  }

  public async updateUserPhone({
    phone,
  }: {
    phone: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        CHANGE_USER_PHONE,
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
      return err.code;
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
      return err.code;
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
  }): Promise<IInfoResponse> {
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
      return err.code;
    }
  }

  public async makeRefreshRequest() {
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
      return err.code;
    }
  }
}

const userService = new UserService();
export default userService;
