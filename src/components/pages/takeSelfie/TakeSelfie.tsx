import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import {
  StyledTakeSelfie,
  StyledTakeSelfieImg,
  StyledTakeSelfieChoose,
} from "./TakeSelfie.styles";
import { useNavigate, useNavigation } from "react-router-dom";
import { AppUrlsEnum } from "@const";
import LoadingBlock from "@common/loadingBlock/LoadingBlock";

const TakeSelfie: React.FC = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [photoTaked, togglePhotoTaked] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string>("");

  const photoConfig = {
    width: 375,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc || "");
    }
  }, [webcamRef, setImgSrc]);

  const usePhotoHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    capture();
    setCounter(counter + 1);
    togglePhotoTaked(true);
    if (counter === 2 && photoTaked && !!imgSrc) {
      setIsLoading(true);
      localStorage.setItem("avatar", imgSrc);
      navigate("../" + AppUrlsEnum.APPROVE_SELFIE);
    }
  };

  const retakePhotoHandler = () => {
    setImgSrc("");
    togglePhotoTaked(false);
    setCounter(0);
  };

  return (
    <WrapperPage>
      {isLoading ? <LoadingBlock /> : <></>}
      {navigation.state === "loading" ? <LoadingBlock /> : <></>}
      <StyledTakeSelfie>
        <StyledTakeSelfieImg>
          {!imgSrc && (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
            />
          )}
          {imgSrc && (
            <div>
              <img src={imgSrc} alt="Screenshot" />
            </div>
          )}
        </StyledTakeSelfieImg>

        <StyledTakeSelfieChoose>
          <button onClick={retakePhotoHandler}>Retake</button>
          <button onClick={usePhotoHandler}>Use Photo</button>
        </StyledTakeSelfieChoose>
      </StyledTakeSelfie>
    </WrapperPage>
  );
};

export default TakeSelfie;
