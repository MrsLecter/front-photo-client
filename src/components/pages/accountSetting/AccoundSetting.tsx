import ButtonBack from "@common/buttons/ButtonBack";
import Logo from "@common/logo/Logo";
import styled from "styled-components";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import Header from "@common/header/Header";
import FeedbackButtonList from "./feedbackButtonList/FeedbackButttonList";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import { useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import { userSlice } from "@/components/store/reducers/userSlice";
import { AppUrlsEnum } from "@const";

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { phoneNumber, userEmail } = useAppSelector(
    (store) => store.userReducer
  );

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!userData!.phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.ACCOUNT_SETTING);
      }
    }
  }, []);

  return (
    <WrapperPage>
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonBack way={AppUrlsEnum.USER_PROFILE} />
      <StyledAccountSetting>
        <Header
          largeFont="22"
          font="18"
          top="10"
          largeTop="30"
          bottom="25"
          label="Account settings"
        />
        <FeedbackButtonList
          phoneNumber={phoneNumber || ""}
          userEmail={userEmail || "undefined"}
        />
      </StyledAccountSetting>
    </WrapperPage>
  );
};

const StyledAccountSetting = styled.div`
  @media (min-width: 1440px) {
    margin: 0 auto;
  }
`;

export default AccountSettings;
