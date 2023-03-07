import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

type TUserState = {
  avatarLink: string;
  userName: string | null;
  phoneNumber?: string;
  userEmail: string | null;
  notificationSettings: {
    textMessages: number;
    emailing: number;
    unsubscribe: number;
  };
  photoPrice: number;
};

const userSetting: TUserState = {
  avatarLink: "",
  userName: "",
  phoneNumber: "",
  userEmail: "",
  notificationSettings: {
    textMessages: 1,
    emailing: 1,
    unsubscribe: 1,
  },
  photoPrice: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userSetting,

  reducers: {
    enroll(state, action: PayloadAction<TUserState>) {
      state.avatarLink = action.payload.avatarLink;
      state.userName = action.payload.userName;
      if (action.payload.phoneNumber) {
        state.phoneNumber = action.payload.phoneNumber;
      }
      state.userEmail = action.payload.userEmail;
      state.notificationSettings.textMessages =
        action.payload.notificationSettings.textMessages;
      state.notificationSettings.emailing =
        action.payload.notificationSettings.emailing;
      state.notificationSettings.unsubscribe =
        action.payload.notificationSettings.unsubscribe;
      state.photoPrice = action.payload.photoPrice;
    },
    setPhone(state, action: PayloadAction<{ phone: string }>) {
      return {
        ...state,
        phoneNumber: action.payload.phone,
      };
    },
    setUserName(state, action: PayloadAction<{ name: string }>) {
      return {
        ...state,
        userName: action.payload.name,
      };
    },
    setUserEmail(state, action: PayloadAction<{ email: string }>) {
      return {
        ...state,
        userEmail: action.payload.email,
      };
    },
    setNotification(
      state,
      action: PayloadAction<{
        textMessages: number;
        emailing: number;
        unsubscribe: number;
      }>
    ) {
      return {
        ...state,
        notificationSettings: {
          textMessages: action.payload.textMessages,
          emailing: action.payload.emailing,
          unsubscribe: action.payload.unsubscribe,
        },
      };
    },
    setAvatar(state, action: PayloadAction<{ avatar: string }>) {
      return {
        ...state,
        avatarLink: action.payload.avatar,
      };
    },
  },
});

export default userSlice.reducer;
