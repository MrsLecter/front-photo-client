import styled from "styled-components";
import downloadPNG from "@images/photo_download.png";

const DownloadButton: React.FC<IDownloadButton> = ({ buttonHandler }) => {
  return (
    <StyledDownloadBtn onClick={() => buttonHandler}>
      <img src={downloadPNG} alt="downloadIcon.png" />
      Download
    </StyledDownloadBtn>
  );
};

interface IDownloadButton {
  buttonHandler: () => void;
}

const StyledDownloadBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Futura";
  font-size: 14px;
  font-weight: 400;
  line-height: 17.95px;
  color: white;
  border: none;
  background-color: transparent;

  img {
    width: 24px;
    height: 21px;
    margin-bottom: 5px;
  }

  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px;
  }
`;

export default DownloadButton;
