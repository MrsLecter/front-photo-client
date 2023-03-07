import { userSlice } from "@/components/store/reducers/userSlice";
import ButtonBack from "@common/buttons/ButtonBack";
import Logo from "@common/logo/Logo";
import { AppUrlsEnum, EMAIL_REGEXP } from "@const";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useInput } from "@hooks/use-input";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import Header from "@common/header/Header";
import {
  FormErrorMessage,
  FormInput,
  FormMain,
} from "@common/FormElements/FormElements";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import userService from "@/api/user-service";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";

const DeterminateEmail: React.FC = () => {
  const [params] = useSearchParams();
  const { setUserEmail, enroll } = userSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { phoneNumber, userEmail, userName } = useAppSelector(
    (store) => store.userReducer
  );

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") navigate("../");
    if (!phoneNumber) {
      if (typeof userData !== "undefined") {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.DET_EMAIL);
      }
    }
  }, []);

  const {
    value: email,
    error: emailIsValid,
    changeHandler: emailChangeHandler,
  } = useInput({ regexp: EMAIL_REGEXP, allowEmpty: false });

  const onChangeEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailIsValid || !email) {
      alert("Field must not be empty or invalid!");
      console.error("Empty or invalid email");
    }
    if (emailIsValid && email) {
      try {
        setIsLoading(true);

        const updateUserEmailResponse = await userService.updateUserEmail({
          userEmail: email,
        });

        if (updateUserEmailResponse.status === 200) {
          dispatch(setUserEmail({ email }));
          if (userEmail) {
            navigate("../" + AppUrlsEnum.ACCOUNT_SETTING);
          } else {
            navigate("../" + AppUrlsEnum.DASHBOARD);
          }
        } else {
          navigate(
            "../" + AppUrlsEnum.INFO + `/${updateUserEmailResponse.message}`
          );
        }
      } catch (err: unknown) {
        console.error(new Error(err as string));
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <WrapperPage>
      <Logo />
      <ButtonBack />
      <WrapperCenter>
        <WrapperContent>
          {userEmail ? (
            <Header
              font="22"
              largeFont="30"
              top="70"
              largeTop="245"
              bottom="10"
              label={"Your email"}
            />
          ) : (
            <>
              <Header
                font="22"
                largeFont="30"
                top="70"
                largeTop="224"
                bottom="0"
                label={`Hey there,`}
              />
              <Header
                font="22"
                largeFont="30"
                top="0"
                largeTop="-20"
                bottom="14"
                label={`${userName}👋`}
              />
            </>
          )}
          <WrapperContentEmail>
            <FormMain formName="changeEmail" onFormSubmit={onChangeEmail}>
              <FormInput
                onChangeHandler={emailChangeHandler}
                inputType="text"
                inputName="email"
                inputIsValid={emailIsValid}
                inputValue={email}
                placeholder="the.real.jane.smith@gmail.com"
              />
              {emailIsValid ? (
                <FormErrorMessage text={""} />
              ) : email.length === 0 ? (
                <FormErrorMessage text={"Field must not be empty"} />
              ) : (
                <FormErrorMessage text={"Error: invalid email"} />
              )}
              <ButtonSubmit
                payment={false}
                top="-5"
                label={userEmail ? "Save" : "See your photos!"}
              />
            </FormMain>
          </WrapperContentEmail>
        </WrapperContent>
      </WrapperCenter>
    </WrapperPage>
  );
};

const WrapperContentEmail = styled.div`
  margin-top: -20px;

  @media (min-width: 1440px) {
    width: 420px;
    margin-left: calc(50vw - 245px);

    & input:nth-child(1) {
      margin-top: 0px;
      margin-bottom: 24px;
    }
  }
`;

export default DeterminateEmail;
