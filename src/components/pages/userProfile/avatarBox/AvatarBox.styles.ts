import styled from "styled-components";

export const StyledAvatarBox = styled.div`
  width: 345px;
  margin: 10px auto 20px;

  @media (min-width: 1440px) {
    width: 420px;
  }
`;

export const StyledHeader = styled.div`
  font-family: "Futura";
  font-weight: 500;
  font-size: 16px;
  line-height: 20.51px;
  color: ${({ theme }) => theme.text.main};
  margin-bottom: 13px;

  @media (min-width: 1440px) {
    font-size: 18px;
    line-height: 23.08px;
  }
`;

export const StyledAvatar = styled.div`
  position: relative;
  width: 117.75px;
  height: 100.5px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1440px) {
    width: 172px;
    height: 150px;

    img {
      width: 150px;
      height: 150px;
    }
  }
`;

export const StyledEdit = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border: none;
  background: transparent;
  width: 36.5px;
  height: 36.5px;
  padding: 0px;
`;

export const StyledEditBtn = styled.button`
  position: absolute;
  bottom: 1px;
  right: 4px;
  width: 35px;
  height: 35px;
  border: none;
  background-color: transparent;
  z-index: 2;

  img {
    width: 35px;
    height: 35px;
  }

  &:hover {
    cursor: pointer;
  }

  input {
    display: none;
  }

  @media (min-width: 1440px) {
    width: 45px;
    height: 45px;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;
