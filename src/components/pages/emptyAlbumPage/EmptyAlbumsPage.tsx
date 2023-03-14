import AvatarLink from "@common/avatarLink/AvatarLink";
import { Carousel } from "@common/carousel/Carousel";
import FrameInvite from "@common/frameInvite/FrameInvite";
import Header from "@common/header/Header";
import Logo from "@common/logo/Logo";
import { AppUrlsEnum, CAROUSEL_ITEMS } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import EmptyAlbumInfo from "./emptyAlbumInfo/EmptyAlbumInfo";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";
import { useEffect } from "react";
import { userSlice } from "@/components/store/reducers/userSlice";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import { useNavigate } from "react-router-dom";
import MessageNotification from "./messageNotification/MessageNotification";
import ArtPinsCarousel from "./ArtPinsCarousel/ArtPinsCarousel";

const EmptyAlbumsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { phoneNumber, avatarLink } = useAppSelector(
    (store) => store.userReducer
  );
  const screenWidth = window.screen.width;

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.ALBUMS_EMPTY);
      }
    }
  }, []);

  return (
    <WrapperPage>
      <Logo />
      <AvatarLink avatar={avatarLink} />
      <MessageNotification />
      <Header
        label="Your photos will drop soon."
        font="16"
        largeFont="22"
        top="25"
        largeTop="50"
        bottom="0"
      />
      <EmptyAlbumInfo />
      <WrapperContent isAlbum={true}>
        <Header
          left={true}
          label="Browse Art Prints"
          font="16"
          largeFont="24"
          top="32"
          largeTop="48"
          bottom="-12"
          largeBottom="-8"
        />
        <ArtPinsCarousel />
      </WrapperContent>

      {screenWidth > 1439 ? <FrameInvite /> : <></>}
    </WrapperPage>
  );
};

export default EmptyAlbumsPage;
