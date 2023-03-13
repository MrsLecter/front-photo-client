import styled, { css } from "styled-components";
import avatarAddSVG from "@images/avatar_add.svg";
import { useNavigate } from "react-router-dom";
import userService from "@/api/user-service";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { userSlice } from "@/components/store/reducers/userSlice";
import { AppUrlsEnum } from "@const";
import { getBase64ImageFromUrl } from "@/components/utils/functions";

const ButtonUpdateSelfie: React.FC<{ isRetake?: boolean }> = ({ isRetake }) => {
  const navigate = useNavigate();
  const { phoneNumber, userName, userEmail } = useAppSelector(
    (store) => store.userReducer
  );
  const { setAvatar } = userSlice.actions;
  const dispatch = useAppDispatch();

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
      const base64Avatar = getBase64ImageFromUrl({
        imgUrl: postSelfieResponse.selfie,
        callback: function (url) {
          console.log("url", url);
        },
      });
      localStorage.setItem("avatar", postSelfieResponse.selfie);
      navigate("../" + AppUrlsEnum.APPROVE_SELFIE);
    } else {
      navigate("../" + AppUrlsEnum.INFO + "/photo not sent! Try again!");
    }
  };

  return (
    <StyledUpdateSelfie isRetake={isRetake}>
      <label htmlFor="myfile">
        {!!isRetake ? "Retake" : <img src={avatarAddSVG} alt="file.svg" />}
      </label>
      <input
        onChange={(e) => fileCoosenHandler(e)}
        type="file"
        id="myfile"
        accept="image/*"
      />
    </StyledUpdateSelfie>
  );
};

const StyledUpdateSelfie = styled.div<{ isRetake?: boolean }>`
  box-sizing: border-box;
  width: ${(props) => (!!props.isRetake ? "170px" : "42px")};
  height: ${(props) => (!!props.isRetake ? "50px" : "42px")};
  border-radius: ${(props) => (!!props.isRetake ? "58px" : "50%")};
  color: white;

  ${(props) =>
    !!props.isRetake
      ? css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border: 1px solid #ffffff;
          label {
            width: 160px;
            text-align: center;
            font-family: Futura;
            font-weight: 500;
            font-size: 18px;
            line-height: 23.08px;
            background-color: #262727;
          }
        `
      : css`
          label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 42px;
            height: 42px;
            color: ${({ theme }) => theme.button.background};

            img {
              width: 42px;
              height: 42px;
            }
          }
        `}

  input {
    display: none;
  }

  &:hover {
    background-color: ${({ theme, isRetake }) =>
      !!isRetake ? "white" : theme.button.background_dark};
    cursor: pointer;
    ${(props) =>
      !!props.isRetake &&
      css`
        label {
          color: #262626;
          background-color: white;
        }
      `}
  }

  @media (min-width: 1440px) {
    margin: 0 auto;
    width: 42px;
    height: 42px;
    border: 1px solid #2245e3;
    border-radius: 50px;

    label {
      margin: 0 auto;
      padding-top: 8px;
      padding-left: 40px;
      font-family: "Futura";
      font-weight: 500;
      font-size: 22px;
      line-height: 28.2px;
      color: #3300cc;
    }
  }
`;

export default ButtonUpdateSelfie;
