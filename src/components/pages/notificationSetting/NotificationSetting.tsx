import ButtonBack from "@common/buttons/ButtonBack";
import ButtonSubmit from "@common/buttons/ButtonSubmit";
import { FormCheckbox, FormMain } from "@common/formElements/FormElements";
import Header from "@common/header/Header";
import Logo from "@common/logo/Logo";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledNotificationContent } from "./NotificationSetting.styles";
import { FormDescriptionWrapper } from "@common/formElements/FormElements";
import { userSlice } from "@/components/store/reducers/userSlice";
import { AppUrlsEnum } from "@const";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import userService from "@/api/user-service";

const NotificationSetting: React.FC = () => {
  const navigate = useNavigate();
  const { setNotification } = userSlice.actions;
  const dispatch = useAppDispatch();
  const { enroll } = userSlice.actions;
  const { phoneNumber, notificationSettings, userEmail } = useAppSelector(
    (store) => store.userReducer
  );
  const [isMessagesEnable, toggleIsMessagesEnable] = useState<boolean>(false);
  const [isEmailEnable, toggleIsEmailEnable] = useState<boolean>(false);
  const [isUnsubscribeEnable, toggleIsUnsubscribeEnable] =
    useState<boolean>(false);

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.NOTIFICATION);
      }
    }
    toggleIsEmailEnable(!!notificationSettings.emailing);
    toggleIsMessagesEnable(!!notificationSettings.textMessages);
    toggleIsUnsubscribeEnable(!!notificationSettings.unsubscribe);
  }, []);

  const onChangeNotification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  const saveSettings = async () => {
    dispatch(
      setNotification({
        textMessages: +isMessagesEnable,
        emailing: +isEmailEnable,
        unsubscribe: +isEmailEnable,
      })
    );
    try {
      const updateNotifResponse = await userService.updateNotification({
        messageNotif: isMessagesEnable,
        emailNotif: isEmailEnable,
        unsubscribeNotif: isUnsubscribeEnable,
      });

      if (updateNotifResponse.status === 200) {
        localStorageHandler.updateNotification({
          textMessages: Number(isMessagesEnable),
          emailing: Number(isEmailEnable),
          unsubscribe: Number(isUnsubscribeEnable),
        });
      } else {
        navigate("../" + AppUrlsEnum.INFO + "/Error during request. Try again");
      }
    } catch (err: any) {
      console.error(new Error(err as string));
    }

    navigate("../" + AppUrlsEnum.USER_PROFILE);
  };

  return (
    <WrapperPage>
      <Logo />
      <ButtonBack way={AppUrlsEnum.USER_PROFILE} />
      <StyledNotificationContent>
        <Header
          font="18"
          largeFont="22"
          top="14"
          largeTop="40"
          label="Notification settings"
          bottom="12"
        />
        <FormMain formName="notification" onFormSubmit={onChangeNotification}>
          <FormCheckbox
            checked={isMessagesEnable}
            label="Text messages"
            value="enable_messages"
            checkboxChangeHandler={() =>
              toggleIsMessagesEnable(!isMessagesEnable)
            }
          />
          <FormCheckbox
            checked={isEmailEnable}
            label="Email"
            value="enable_email"
            checkboxChangeHandler={() => toggleIsEmailEnable(!isEmailEnable)}
          />
          <FormCheckbox
            checked={isUnsubscribeEnable}
            label="Unsubscribe"
            value="enable_unsubscribe"
            checkboxChangeHandler={() =>
              toggleIsUnsubscribeEnable(!isUnsubscribeEnable)
            }
          />
          <FormDescriptionWrapper width="small">
            Stop marketing notifications. You will still receive transactional
            notifications for purchases and when new photos are available.
          </FormDescriptionWrapper>
          <ButtonSubmit
            buttonHandler={() => saveSettings()}
            label={"Save"}
            top="0"
          />
        </FormMain>
      </StyledNotificationContent>
    </WrapperPage>
  );
};

export default NotificationSetting;
