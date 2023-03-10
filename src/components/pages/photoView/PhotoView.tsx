import ButtonClose from "@common/buttons/ButtonClose";
import { PaymentModal } from "@common/paymentModal/PaymentModal";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import {
  StyledPhotoView,
  StyledPhoto,
  StyledBottomPanel,
} from "./PhotoView.styled";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { userSlice } from "@/components/store/reducers/userSlice";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import { AppUrlsEnum } from "@const";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import ButtonBordered from "@common/buttons/ButtonBordered";
import DownloadButton from "./DownloadButton/DownloadButton";

const PhotoView: React.FC = () => {
  const [params] = useSearchParams();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const photoURL = params.get("photo") || "1";
  const photoID = params.get("id") || "0";
  const photoAlbum = params.get("album") || "none";
  const photoMarked = params.get("marked") || "false";
  const markedAmount = params.get("markedamount") || "0";
  const [isDownloadMenuActive, seIsDownloadMenuActive] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { photoPrice, phoneNumber } = useAppSelector(
    (store) => store.userReducer
  );
  const [isShareActive, setisShareActive] = useState<boolean>(false);
  const [isPaymentActive, togglePaymentActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") navigate("../");
    if (!phoneNumber) {
      if (typeof userData !== "undefined") {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.DASHBOARD);
      }
    }
  }, []);

  const downloadPhoto = () => {
    console.log("photoURL", photoURL);
  };

  const toggleDownloadMenu = () => {
    seIsDownloadMenuActive(!isDownloadMenuActive);
    setisShareActive(false);
  };

  const toggleShareMenu = () => {
    setisShareActive(!isShareActive);
    seIsDownloadMenuActive(false);
  };
  return (
    <StyledPhotoView>
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <ButtonClose color={"white"} />

      <StyledPhoto>
        <img src={photoURL} alt="userPhoto.jpg" />
      </StyledPhoto>
      <StyledBottomPanel>
        {photoMarked === "true" ? (
          <ButtonSubmit
            payment={true}
            label="Unlock photo"
            top="-10"
            buttonHandler={() => togglePaymentActive(true)}
          />
        ) : (
          <>
            <DownloadButton url={photoURL} />
            <ButtonBordered
              way={"../" + AppUrlsEnum.FRAMED + `?photo=${photoURL}`}
              label={"See in a frame"}
              width={196}
            />
          </>
        )}
      </StyledBottomPanel>

      {photoMarked === "true" && isPaymentActive ? (
        <WrapperModal
          top={300}
          width={375}
          height={344}
          widthLarge={480}
          heightLarge={327}
          borderRadius={20}
          isAlbum={false}
          backClickHandler={() => togglePaymentActive(false)}
        >
          <PaymentModal
            photoId={+photoID}
            isAlbum={false}
            priceAlbum={+markedAmount * +photoPrice}
            pricePhoto={+photoPrice}
            markedPhoto={+markedAmount}
            albumName={photoAlbum}
          />
        </WrapperModal>
      ) : (
        <></>
      )}
    </StyledPhotoView>
  );
};

export default PhotoView;
