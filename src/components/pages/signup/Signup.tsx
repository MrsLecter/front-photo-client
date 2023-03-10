import { userSlice } from "@/components/store/reducers/userSlice";
import Header from "@common/header/Header";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import { AppUrlsEnum, PHONE_REGEXP } from "@const";
import { useAppDispatch } from "@hooks/reducers.hook";
import { useInput } from "@hooks/use-input";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { StyledSignup, SignupFormWrapper } from "./Signup.styles";
import LanguageBtn from "@common/buttons/LanguageBtn";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import LegalLinks from "./legalLinks/LegalLinks";
import {
  FormInputSmall,
  FormLabel,
  FormMain,
} from "@common/FormElements/FormElements";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import userService from "@/api/user-service";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import DownloadButton from "../photoView/DownloadButton/DownloadButton";

const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const { setPhone } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const phoneCode = params.get("code") || "1";
  const countryCode = params.get("icon") || "US";

  const {
    value: phone,
    error: phoneIsValid,
    changeHandler: phoneChangeHandler,
  } = useInput({
    regexp: PHONE_REGEXP,
    allowEmpty: false,
    mask: `+${phoneCode}(___)___-____`,
    maskType: "phone",
  });

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phone) {
      console.error("Error: login or password not valid!");
      alert("Error: phone number not valid! The field must not be empty");
      return;
    }

    if (phone && phoneIsValid) {
      setIsLoading(true);
      dispatch(setPhone({ phone }));
      localStorageHandler.setUserPhone({ phone });

      try {
        const responseRegistration = await userService.registration({
          phone,
        });
        if (
          responseRegistration.status === 201 ||
          responseRegistration.status === 200
        ) {
          navigate("../" + AppUrlsEnum.CONFIRM);
        } else {
          navigate(
            "../" + AppUrlsEnum.INFO + "/Error during request. Try again"
          );
        }
      } catch (err: any) {
        console.error(new Error(err));
        navigate("../" + AppUrlsEnum.INFO + "/Error during request. Try again");
      }
    }
    return;
  };
  return (
    <WrapperPage>
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <WrapperCenter>
        <WrapperContent>
          <Header
            label="Let’s get started"
            font="22"
            largeFont="30"
            bottom="5"
          />
          <SignupFormWrapper>
            <FormMain
              formName="signupForm"
              onFormSubmit={(event) => formSubmitHandle(event)}
            >
              <FormLabel text={"Enter your phone number"} />
              <StyledSignup>
                <LanguageBtn country={countryCode} />
                <FormInputSmall
                  inputName="phone"
                  inputType="tel"
                  inputIsValid={phoneIsValid}
                  inputValue={phone}
                  onChangeHandler={phoneChangeHandler}
                  placeholder={`+${phoneCode}(555)555-5555`}
                />
              </StyledSignup>
              <ButtonSubmit payment={false} top="0" label={"Create account"} />
            </FormMain>
          </SignupFormWrapper>

          <LegalLinks />
        </WrapperContent>
      </WrapperCenter>
    </WrapperPage>
  );
};

export default Signup;
