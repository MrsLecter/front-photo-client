import {
  StyledAvatarBox,
  StyledHeader,
  StyledAvatar,
  StyledEditBtn,
} from "./AvatarBox.styles";
import avatarChangeSVG from "@images/avatar_edit.png";
import { AppUrlsEnum } from "@const";
import { useNavigate } from "react-router-dom";

const AvatarBox: React.FC<{
  avatarLink: string;
}> = ({ avatarLink }) => {
  const navigate = useNavigate();
  const fileCoosenHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imagesTarget = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(imagesTarget![0]);
    reader.addEventListener("load", () => {
      localStorage.setItem("@photodrop-load", String(reader.result));
      navigate("../" + AppUrlsEnum.APPROVE_SELFIE);
    });
  };
  return (
    <StyledAvatarBox>
      <StyledHeader>Your selfie</StyledHeader>
      <StyledAvatar>
        <img src={avatarLink ? avatarLink : avatarChangeSVG} alt="avatar" />
        <StyledEditBtn type="button">
          <label htmlFor="myfile">
            <img src={avatarChangeSVG} alt="file.svg" />
          </label>
          <input
            onChange={(e) => fileCoosenHandler(e)}
            type="file"
            id="myfile"
            accept="image/*"
          />
        </StyledEditBtn>
      </StyledAvatar>
    </StyledAvatarBox>
  );
};

export default AvatarBox;
