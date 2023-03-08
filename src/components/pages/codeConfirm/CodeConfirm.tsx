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

const CodeConfirm: React.FC = () => {
  const { phoneNumber } = useAppSelector((store) => store.userReducer);
  const { enroll } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [confirmCode, setConfirmCode] = useState<string>("");
  const [isValidConfirmCode, setIsValidConfirmCode] = useState(true);

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
        console.log("confirmCodeResponse", confirmCodeResponse);
        if (confirmCodeResponse.status === 200) {
          const userData = {
            accessToken: confirmCodeResponse.accessToken,
            refreshToken: confirmCodeResponse.refreshToken,
            avatarLink: confirmCodeResponse.avatarLink || "",
            userName: confirmCodeResponse.userName,
            phoneNumber: confirmCodeResponse.phoneNumber,
            userEmail: confirmCodeResponse.userEmail,
            notificationSettings: {
              textMessages:
                confirmCodeResponse.notificationSettings.textMessages,
              emailing: confirmCodeResponse.notificationSettings.email,
              unsubscribe: confirmCodeResponse.notificationSettings.unsubscribe,
            },
            photoPrice: +photoPriceResponse.message,
          };

          dispatch(enroll(userData));
          localStorageHandler.setUserData(userData);
          if (!confirmCodeResponse.avatarLink) {
            navigate("../" + AppUrlsEnum.ADD_SELFIE);
          } else {
            navigate("../" + AppUrlsEnum.DASHBOARD);
          }
        } else if (confirmCodeResponse.status === 406) {
          alert(
            "Your code is expired! Write /resetCode https://t.me/framology_bot -> @framology_bot</a>"
          );
        } else {
          navigate(
            "../" + AppUrlsEnum.INFO + "/Incorrect confirmation code. Try again"
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
