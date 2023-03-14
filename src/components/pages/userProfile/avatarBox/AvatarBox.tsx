import {
  StyledAvatarBox,
  StyledHeader,
  StyledAvatar,
  StyledEdit,
} from "./AvatarBox.styles";
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
        </StyledEdit>
      </StyledAvatar>
    </StyledAvatarBox>
  );
};

export default AvatarBox;
