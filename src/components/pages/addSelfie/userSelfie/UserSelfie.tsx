import avatarEmptyPNG from "@images/avatar_empty.png";
import avatarAddSVG from "@images/avatar_add.svg";
import {
  StyledUserSelfie,
  StyledUserAvatar,
  StyledUserBtn,
} from "./UserSelfie.styles";
import { userSlice } from "@/components/store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { useNavigate } from "react-router-dom";
import userService from "@/api/user-service";
import { AppUrlsEnum } from "@const";

const UserSelfie: React.FC<UserSelfieProps> = ({ userImage }) => {
  const navigation = useNavigate();

  const fileCoosenHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imagesTarget = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(imagesTarget![0]);
    reader.addEventListener("load", () => {
      localStorage.setItem("@photodrop-load", String(reader.result));
      navigation("../" + AppUrlsEnum.APPROVE_SELFIE);
    });
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
          <img src={avatarAddSVG} alt="file.svg" />
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
