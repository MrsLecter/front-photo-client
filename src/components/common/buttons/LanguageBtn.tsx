import { findFlagUrlByIso2Code } from "country-flags-svg";
import { useNavigate } from "react-router-dom";
import downSVG from "@images/down.svg";
import styled from "styled-components";
import { AppUrlsEnum } from "@const";

const LanguageBtn: React.FC<{ country?: string }> = (props) => {
  const { country = "US" } = props;
  const navigate = useNavigate();

  const chooseLanguageHandler = () => {
    navigate("../" + AppUrlsEnum.CHOOSE_LANG);
  };

  return (
    <StyledLanguageBtn onClick={chooseLanguageHandler} type="button">
      <img src={findFlagUrlByIso2Code(country)} alt="countryFlag" />
      <img src={downSVG} alt="down.svg" />
    </StyledLanguageBtn>
  );
};

const StyledLanguageBtn = styled.button`
  box-sizing: border-box;
  padding: 8px 16.5px 7px 8px;
  width: 70px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.input.border};
  background: ${({ theme }) => theme.button.background_grey};

  & > img:nth-child(1) {
    width: 30px;
    height: 25px;
  }

  & > img:nth-child(2) {
    margin-left: 8px;
    width: 13.5px;
    height: 6.5px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.button.background_darkgrey};
  }
`;

const StyledFlag = styled.img``;

export default LanguageBtn;
