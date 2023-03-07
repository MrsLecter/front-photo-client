import styled from "styled-components";

export const StyledPhotoView = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  button:nth-child(3) {
    margin: 0 auto;
  }
`;

export const StyledPhoto = styled.div`
  width: 345px;
  height: 461px;
  display: flex;
  jusify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`;
