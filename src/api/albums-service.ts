import {
  GET_ACTUAL_PRICE_URL,
  PAYMENT_ALBUM_URL,
  PAYMENT_PHOTO_URL,
} from "@const";
import {
  IAlbumsResponse,
  IInfoResponse,
  IPriceResponse,
} from "./axios-response-types.types";
import axiosInstance from "./custom-axios-instance";

class AlbumService {
  public async pageRequest({
    pageEndpoint,
  }: {
    pageEndpoint: string;
  }): Promise<IAlbumsResponse> {
    try {
      const response: IAlbumsResponse = await axiosInstance().get(
        pageEndpoint,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in page request: ", err);
      return err.code;
    }
  }

  public async makePaymentForAlbum({
    albumName,
    card,
    carddate,
    cvs,
    price,
  }: {
    albumName: string;
    card: string;
    carddate: string;
    cvs: string;
    price: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        PAYMENT_ALBUM_URL,
        {
          card: "4242424242424242", //test value
          exp_month: carddate.split("/")[0],
          exp_year: "20" + carddate.split("/")[1],
          cvc: "333", //test value
          albumname: albumName,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in page request: ", err);
      return err.code;
    }
  }

  public async makePaymentForPhoto({
    card,
    carddate,
    cvs,
    photoid,
    price,
  }: {
    card: string;
    carddate: string;
    cvs: string;
    photoid: string;
    price: string;
  }): Promise<IInfoResponse> {
    try {
      const response: IInfoResponse = await axiosInstance().post(
        PAYMENT_PHOTO_URL,
        {
          card: "4242424242424242", //test value
          exp_month: carddate.split("/")[0],
          exp_year: "20" + carddate.split("/")[1],
          cvc: "333", //test value
          photoid: photoid,
          price: price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in page request: ", err);
      return err.code;
    }
  }

  public async getPhotoPrice(): Promise<IPriceResponse> {
    try {
      const response: IPriceResponse = await axiosInstance().get(
        GET_ACTUAL_PRICE_URL,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      return response;
    } catch (err: any) {
      console.error("An error occured in page request: ", err);
      return err.code;
    }
  }

  public async photoRequest({ photoEndpoint }: { photoEndpoint: string }) {
    try {
      const response = await axiosInstance().get(photoEndpoint, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      return response;
    } catch (err: any) {
      console.error("An error occured in page request: ", err);
      return err.code;
    }
  }
}

const albumService = new AlbumService();

export default albumService;
