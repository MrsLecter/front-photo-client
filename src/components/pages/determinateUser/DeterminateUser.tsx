import { userSlice } from "@/components/store/reducers/userSlice";
import ButtonBack from "@common/buttons/ButtonBack";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import {
  FormErrorMessage,
  FormInput,
  FormMain,
} from "@common/FormElements/FormElements";
import Header from "@common/header/Header";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";
import Logo from "@common/logo/Logo";
import { AppUrlsEnum } from "@const";
import { FULLNAME_REGEXP } from "@/components/utils/regexp";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useInput } from "@hooks/use-input";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import userService from "@/api/user-service";
import WrapperCenter from "@wrappers/wrapperCenter/wrapperCenter";
import WrapperContent from "@wrappers/wrapperContent/wrapperContent";

const DeterminateUser: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserName, enroll } = userSlice.actions;
  const { userName, userEmail, phoneNumber } = useAppSelector(
    (store) => store.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") navigate("../");
    if (!phoneNumber) {
      if (typeof userData !== "undefined") {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.DET_USER);
      }
    }
  }, []);

  const {
    value: fullname,
    error: fullnameIsValid,
    changeHandler: fullnameChangeHandler,
  } = useInput({ regexp: FULLNAME_REGEXP, allowEmpty: false });

  const onChangeFullname = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullnameIsValid || !fullname) {
      alert("Field must not be empty or invalid!");
      console.error("Empty or invalid fullname");
    }
    if (fullnameIsValid && fullname) {
      try {
        setIsLoading(true);
        dispatch(setUserName({ name: fullname }));
        const updateUserNameResponse = await userService.updateUserName({
          userName: fullname,
        });
        if (updateUserNameResponse.status === 200) {
          setUserName({ name: fullname });
          localStorageHandler.changeName(fullname);
          if (!userEmail) {
            navigate("../" + AppUrlsEnum.DET_EMAIL);
          } else {
            navigate("../" + AppUrlsEnum.USER_PROFILE);
          }
        } else {
          navigate(
            "../" + AppUrlsEnum.INFO + `/${updateUserNameResponse.message}`
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
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <Logo />
      <ButtonBack way={AppUrlsEnum.USER_PROFILE} />
      <WrapperCenter>
        <WrapperContent>
          {userName ? (
            <Header font="22" largeFont="30" bottom="0" label="Your name" />
          ) : (
            <Header
              font="22"
              largeFont="30"
              bottom="0"
              label="Let’s get to know you"
            />
          )}
          <WrapperContentUser>
            <FormMain formName="changeEmail" onFormSubmit={onChangeFullname}>
              <FormInput
                onChangeHandler={fullnameChangeHandler}
                inputType="text"
                inputName="email"
                inputIsValid={fullnameIsValid}
                inputValue={fullname}
                placeholder="What’s your name?"
              />
              {userName ? (
                <ButtonSubmit payment={false} label={"Save"} top="-6" />
              ) : (
                <ButtonSubmit payment={false} label={"Next"} top="-6" />
              )}
            </FormMain>
          </WrapperContentUser>
        </WrapperContent>
      </WrapperCenter>
    </WrapperPage>
  );
};

const WrapperContentUser = styled.div`
  @media (min-width: 1440px) {
    width: 420px;
    margin-left: calc(50vw - 245px);

    & input:nth-child(1) {
      margin-top: -0px;
      margin-bottom: 24px;
    }
  }
`;

export default DeterminateUser;
