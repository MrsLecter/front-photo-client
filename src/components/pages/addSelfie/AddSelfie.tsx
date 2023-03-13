import { isTokensNeedRefresh } from "@/components/utils/functions";
import { userSlice } from "@/components/store/reducers/userSlice";
import ButtonBack from "@common/buttons/ButtonBack";
import { ContextMenu } from "@common/contextMenu/ContextMenu";
import { Description } from "@common/description/Description";
import Header from "@common/header/Header";
import Logo from "@common/logo/Logo";
import { AppUrlsEnum } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import WrapperModal from "@wrappers/wrapperModal/WrapperModal";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSelfie from "./userSelfie/UserSelfie";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";

const AddSelfie: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { avatarLink, phoneNumber } = useAppSelector(
    (store) => store.userReducer
  );
  const [isActiveContext, toggleIsActiveContext] = useState<boolean>(false);
  const screenWidth = window.screen.width;

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") navigate("../");
    if (!phoneNumber) {
      if (typeof userData !== "undefined") {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.ADD_SELFIE);
      }
    }
  }, []);

  return (
    <WrapperPage>
      <Logo />
      <ButtonBack />
      <Header
        label="Add a selfie"
        font="22"
        largeFont="30"
        top="50"
        largeTop="170"
        bottom="4"
        largeBottom="28"
      />
      <Description text="A selfie allows your photos to be synced with your account." />
      <UserSelfie userImage={avatarLink} />
    </WrapperPage>
  );
};

export default AddSelfie;
