import {
  convertDataFormat,
  ejectAlbumInfo,
} from "@/components/utils/functions";
import { IAlbumInfo, IPhotoObject } from "@/components/types/commonTypes";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { AppUrlsEnum, DASHBOARD_URL, GET_ACTUAL_PRICE_URL } from "@const";
import ButtonBack from "@common/buttons/ButtonBack";
import { PhotosBox, PhotosItem } from "@common/photosBox/PhotosBox";
import { PaymentModal } from "@common/paymentModal/PaymentModal";
import {
  StyledAlbumView,
  StyledAlbumHeader,
  StyledAlbumContent,
  StyledAlbumDescription,
  StyledAlbumButton,
  UnlockBtn,
} from "./AlbumView.styled";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import FrameInvite from "@common/frameInvite/FrameInvite";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import { userSlice } from "@/components/store/reducers/userSlice";
import albumService from "@/api/albums-service";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";
import localStorageHandler from "@/components/utils/local-storage-hendler";

const AlbumView: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  let { albumName } = useParams();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { photoPrice, phoneNumber } = useAppSelector(
    (store) => store.userReducer
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photosData, setPhotosData] = useState<IPhotoObject[]>();
  const [albumInfo, setAlbumInfo] = useState<IAlbumInfo>();
  const [isActiveModal, toggleIsActiveModal] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const userData = localStorageHandler.getUserData();

    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!userData!.phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.ALBUM_VIEW + `/${albumName}`);
      }
    }
    const getPhotosData = async () => {
      const photos = await albumService.pageRequest({
        pageEndpoint: DASHBOARD_URL + `/${albumName}`,
      });
      setPhotosData(photos.message);
      const albumsInfo = ejectAlbumInfo(photos.message);
      setAlbumInfo(albumsInfo);
    };
    getPhotosData();
    setIsLoading(false);
  }, []);

  return (
    <WrapperPage>
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <StyledAlbumView>
        <StyledAlbumHeader>
          <ButtonBack height="small" />
          <StyledAlbumContent>
            <div>{albumInfo?.albumName}</div>
            <StyledAlbumDescription>
              {convertDataFormat(albumInfo?.albumDate || "")} &bull;
              <span>{albumInfo?.photoAmount} photos</span>
            </StyledAlbumDescription>
            {albumInfo && albumInfo?.hasMarked ? (
              <UnlockBtn onClick={() => toggleIsActiveModal(true)}>
                Unlock your photos
              </UnlockBtn>
            ) : (
              <></>
            )}
          </StyledAlbumContent>
        </StyledAlbumHeader>
        <WrapperContent isAlbum={true}>
          <PhotosBox>
            {photosData ? (
              photosData.map((item) => (
                <PhotosItem
                  key={item.id}
                  id={item.id}
                  src={item.path}
                  albumId={item.album}
                  marked={item.marked}
                  albumMarked={albumInfo?.marketCount}
                />
              ))
            ) : (
              <></>
            )}
          </PhotosBox>
          <StyledAlbumButton>
            {albumInfo && albumInfo?.hasMarked ? (
              <ButtonSubmit
                label="Unlock your photos"
                top="0"
                bottom="100"
                buttonHandler={() => toggleIsActiveModal(true)}
              />
            ) : (
              <></>
            )}
          </StyledAlbumButton>
        </WrapperContent>
        {!isActiveModal && <FrameInvite />}
        {isActiveModal && albumInfo && albumInfo.marketCount > 0 ? (
          <WrapperModal
            width={375}
            height={350}
            borderRadius={20}
            top={230}
            widthLarge={480}
            heightLarge={257}
            topLarge={230}
            isAlbum={true}
            backClickHandler={() => toggleIsActiveModal(false)}
          >
            <PaymentModal
              isAlbum={true}
              priceAlbum={
                albumInfo && photoPrice ? photoPrice * albumInfo.marketCount : 0
              }
              pricePhoto={0}
              albumName={albumInfo ? albumInfo.albumName : "notAssigned"}
              markedPhoto={albumInfo ? albumInfo.marketCount : 0}
            />
          </WrapperModal>
        ) : (
          <></>
        )}
      </StyledAlbumView>
    </WrapperPage>
  );
};

export default AlbumView;
