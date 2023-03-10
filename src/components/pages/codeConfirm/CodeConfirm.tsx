import { userSlice } from "@/components/store/reducers/userSlice";
import ButtonBack from "@common/buttons/ButtonBack";
import Logo from "@common/logo/Logo";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Header from "@common/header/Header";
import {
  FormCodeInput,
  FormLabelPhone,
  FormMain,
} from "@common/FormElements/FormElements";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import styled from "styled-components";
import { AppUrlsEnum } from "@const";
import userService from "@/api/user-service";
import albumService from "@/api/albums-service";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";
import ButtonResentCode from "@common/buttons/ButtonResentCode";

const CodeConfirm: React.FC = () => {
  const { phoneNumber } = useAppSelector((store) => store.userReducer);
  const { enroll } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [confirmCode, setConfirmCode] = useState<string>("");
  const [isValidConfirmCode, setIsValidConfirmCode] = useState(true);

  const codeResentHandler = async () => {
    try {
      console.log("phoneNumber", phoneNumber);
      const confirmCodeResent = await userService.resentCode({
        phone: "" + phoneNumber?.trim(),
      });
      if (confirmCodeResent.status === 404) {
        //get code first
      }
      setConfirmCode("");
      console.log(confirmCodeResent);
    } catch (err: any) {
      console.error(new Error(err));
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!confirmCode || (confirmCode.length !== 6 && !isValidConfirmCode)) {
      setIsValidConfirmCode(false);
      alert("Error: code not valid! The field must not be empty");
      console.error("Error: confirmation code not valid!");
      return;
    }
    if (isValidConfirmCode && confirmCode.length === 6) {
      try {
        const confirmCodeResponse = await userService.confirm({
          phone: "" + phoneNumber?.trim(),
          code: confirmCode,
        });
        const photoPriceResponse = await albumService.getPhotoPrice();
        if (confirmCodeResponse.status === 200) {
          const userData = {
            accessToken: confirmCodeResponse.data.accessToken,
            refreshToken: confirmCodeResponse.data.refreshToken,
            avatarLink: confirmCodeResponse.data.avatarLink || "",
            userName: confirmCodeResponse.data.userName,
            phoneNumber: confirmCodeResponse.data.phoneNumber,
            userEmail: confirmCodeResponse.data.userEmail,
            notificationSettings: {
              textMessages:
                confirmCodeResponse.data.notificationSettings.textMessages,
              emailing: confirmCodeResponse.data.notificationSettings.email,
              unsubscribe:
                confirmCodeResponse.data.notificationSettings.unsubscribe,
            },
            photoPrice: +photoPriceResponse.message,
          };

          dispatch(enroll(userData));
          localStorageHandler.setUserData(userData);
          if (!confirmCodeResponse.data.avatarLink) {
            navigate("../" + AppUrlsEnum.ADD_SELFIE);
          } else {
            navigate("../" + AppUrlsEnum.DASHBOARD);
          }
        } else if (confirmCodeResponse.status === 406) {
          alert(
            "Your code is expired! Write /resetCode https://t.me/framology_bot -> @framology_bot</a>"
          );
          console.info(
            "Your code is expired! Write /resetCode https://t.me/framology_bot -> @framology_bot</a>"
          );
        } else {
          navigate(
            "../" +
              AppUrlsEnum.INFO +
              "/Incorrect confirmation code. Click on resent code button"
          );
        }
      } catch (err: any) {
        console.error(new Error(err));
      }
    }
  };

  return (
    <WrapperPage>
      <Logo />
      <ButtonBack />
      <WrapperCenter>
        <WrapperContent>
          <Header
            label="What’s the code?"
            font="22"
            largeFont="30"
            bottom="5"
          />
          <CodeConfirmFormWrapper>
            <FormMain onFormSubmit={onFormSubmit} formName="confirmationCode">
              <FormLabelPhone text={phoneNumber || ""} />
              <FormCodeInput
                inputChangeHandler={setConfirmCode}
                inputIsValid={isValidConfirmCode}
              />
              <ButtonResentCode codeResentHandler={codeResentHandler} />
              <ButtonSubmit top="25" label="Next" payment={false} />
            </FormMain>
          </CodeConfirmFormWrapper>
        </WrapperContent>
      </WrapperCenter>
    </WrapperPage>
  );
};

const CodeConfirmFormWrapper = styled.div`
  @media (min-width: 1440px) {
    width: 420px;
    margin-left: calc(50vw - 245px);
  }
`;

export default CodeConfirm;
