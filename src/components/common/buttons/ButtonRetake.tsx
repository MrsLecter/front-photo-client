import { AppUrlsEnum } from "@const";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ButtonRetake = () => {
  const navigate = useNavigate();
  return (
    <StyledRetakeButton
      onClick={() => navigate("../" + AppUrlsEnum.ADD_SELFIE)}
      type="button"
    ></StyledRetakeButton>
  );
};

const StyledRetakeButton = styled.button``;
