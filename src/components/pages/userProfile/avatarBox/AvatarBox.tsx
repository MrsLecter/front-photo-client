import {
  StyledAvatarBox,
  StyledHeader,
  StyledAvatar,
  StyledEdit,
} from "./AvatarBox.styles";
import avatarAddSVG from "../../../../assets/images/avatar_add.svg";
import avatar from "@images/avatar_edit.png";
import ButtonUpdateSelfie from "@common/buttons/ButtonUpdateSelfie";

const AvatarBox: React.FC<{
  avatarLink: string;
}> = ({ avatarLink }) => {
  return (
    <StyledAvatarBox>
      <StyledHeader>Your selfie</StyledHeader>
      <StyledAvatar>
        <img src={avatarLink ? avatarLink : avatar} alt="avatar" />
        <StyledEdit>
          <ButtonUpdateSelfie />
          {/* <img src={avatarAddSVG} alt="edit.png" /> */}
        </StyledEdit>
      </StyledAvatar>
    </StyledAvatarBox>
  );
};

export default AvatarBox;
