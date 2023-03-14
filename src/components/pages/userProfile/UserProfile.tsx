import { userSlice } from "@/components/store/reducers/userSlice";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import ButtonBack from "@common/buttons/ButtonBack";
import Header from "@common/header/Header";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import { AppUrlsEnum } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../common/logo/Logo";
import AvatarBox from "./avatarBox/AvatarBox";
import { SettingList } from "./settingList/SettingList";

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { userName, userEmail, avatarLink, phoneNumber } = useAppSelector(
    (store) => store.userReducer
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!userData!.phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.USER_PROFILE);
      }
    }
  }, []);

  return (
    <WrapperPage>
      {isLoading ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonBack way={AppUrlsEnum.DASHBOARD} />
      <Header
        label={"Welcome, " + userName}
        font="18"
        largeFont="22"
        top="18"
        largeTop="60"
        bottom="0"
      />
      <AvatarBox avatarLink={avatarLink} />
      <SettingList />
    </WrapperPage>
  );
};
