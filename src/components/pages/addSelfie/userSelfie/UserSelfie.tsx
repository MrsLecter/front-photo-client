import avatarEmptyPNG from "@images/avatar_empty.png";
import avatatAddSVG from "@images/avatar_add.svg";
import {
  StyledUserSelfie,
  StyledUserAvatar,
  StyledUserBtn,
} from "./UserSelfie.module";
import { userSlice } from "@/components/store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useNavigate } from "react-router-dom";
import userService from "@/api/user-service";
import { AppUrlsEnum } from "@const";

const UserSelfie: React.FC<UserSelfieProps> = ({ userImage }) => {
  const { phoneNumber, userName, userEmail } = useAppSelector(
    (store) => store.userReducer
  );
  const { setAvatar } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const fileCoosenHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imagesTarget = event.target.files;
    const selfieFile = Array.from(imagesTarget!)[0];
    let formData = new FormData();
    formData.append("selfie", "selfie");
    formData.append("selfie", selfieFile);

    const postSelfieResponse = await userService.postSelfie({
      phoneNumber: phoneNumber ? phoneNumber : "",
      formData,
    });
    if (postSelfieResponse.status === 201) {
      dispatch(setAvatar({ avatar: postSelfieResponse.selfie }));
      localStorage.setItem("avatar", postSelfieResponse.selfie);
      navigation("../" + AppUrlsEnum.APPROVE_SELFIE);
    } else {
      navigation("../" + AppUrlsEnum.INFO + "/photo not sent! Try again!");
    }
  };
  return (
    <StyledUserSelfie>
      <StyledUserAvatar>
        {!userImage ? (
          <img src={avatarEmptyPNG} alt="avatar" />
        ) : (
          <img src={userImage} alt="avatar" />
        )}
      </StyledUserAvatar>

      <StyledUserBtn type="button">
        <label htmlFor="myfile">
          Choose File <img src={avatatAddSVG} alt="file.svg" />
        </label>
        <input
          onChange={(e) => fileCoosenHandler(e)}
          type="file"
          id="myfile"
          accept="image/*"
        />
      </StyledUserBtn>
    </StyledUserSelfie>
  );
};

interface UserSelfieProps {
  userImage: string;
}

export default UserSelfie;
