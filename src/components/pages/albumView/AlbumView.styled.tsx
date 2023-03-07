import styled from "styled-components";

export const StyledAlbumView = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

export const StyledAlbumHeader = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  padding: 11px 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  button {
    margin: 0px;
  }
`;

export const StyledAlbumContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Termina";
  font-weight: 700;
  font-size: 18px;
  line-height: 21.6px;
  color: ${({ theme }) => theme.text.main};

  & > div:nth-child(1) {
    margin-left: 0px;
  }

  @media (min-width: 1440px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-size: 22px;
    line-height: 26.4px;

    & > div:nth-child(1) {
      margin-left: 64px;
      margin-right: 38px;
    }
  }
`;

export const UnlockBtn = styled.button`
  position: absolute;
  right: 120px;
  padding: 0px;
  display: none;
  border: none;
  font-family: "Futura";
  font-weight: 500;
  font-size: 22px;
  line-height: 22.8px;
  color: ${({ theme }) => theme.button.background};
  background-color: transparent;

  @media (min-width: 1440px) {
    display: block;
  }
`;

export const StyledAlbumDescription = styled.div`
  font-family: "Futura";
  font-size: 14px;
  font-weight: 400;
  line-height: 17.95px;
  color: ${({ theme }) => theme.text.main};
  text-align: left;

  span {
    color: ${({ theme }) => theme.text.links};
  }

  @media (min-width: 1440px) {
    font-size: 16px;
    line-height: 20.51px;
  }
`;

export const StyledAlbumButton = styled.div`
  width: 345px;
  margin: 0 auto;
  margin-top: 145px;
`;
