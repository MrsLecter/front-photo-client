import WrapperPage from "@wrappers/wrapperPage/WrapperPage";
import { useCallback, useRef, useState } from "react";
import {
  StyledApproveSelfie,
  StyledSelfieHeader,
  StyledSelfieText,
  StyledSelfieButtonPanel,
  StyledSaveSelfieBtn,
  StyledCropperWrapper,
} from "./ApproveSelfie.styles";
import Cropper from "react-easy-crop";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import { generateDownload } from "./ApproveSelfieUtils";
import ButtonClose from "@common/buttons/ButtonClose";
import userService from "@/api/user-service";
import { AppUrlsEnum } from "@const";
import { userSlice } from "@/components/store/reducers/userSlice";
import { useAppDispatch } from "@hooks/reducers.hook";
import { useNavigate } from "react-router-dom";

export const ApproveSelfie: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>();
  const triggerFileSelectPopup = () => {
    if (inputRef.current) inputRef.current.click();
  };
  const avatar = localStorage.getItem("@photodrop-load");
  const [image, setImage] = useState(avatar || "");
  const [croppedArea, setCroppedArea] = useState({ width: 0, height: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { setAvatar } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const onSelectFile = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(String(reader.result));
        localStorage.setItem("@photodrop-load", String(reader.result));
      });
    }
  };

  const onCropComplete = useCallback(
    (_: any, croppedAreaPixels: { width: number; height: number }) => {
      setCroppedArea(croppedAreaPixels);
      localStorage.setItem("croppedArea", JSON.stringify(croppedArea));
    },
    []
  );

  const downloadImage = async () => {
    const selfieFormData = await generateDownload(image, croppedArea);
    const postSelfieResponse = await userService.postSelfie({
      phoneNumber: localStorageHandler.getUserData()?.phoneNumber || "",
      formData: selfieFormData!,
    });
    if (postSelfieResponse.status === 201) {
      dispatch(setAvatar({ avatar: postSelfieResponse.selfie }));
      localStorageHandler.updateUserAvatar({
        avatar: postSelfieResponse.selfie,
      });
      localStorage.removeItem("@photodrop-load");
      navigation("../" + AppUrlsEnum.DASHBOARD);
    } else {
      navigation("../" + AppUrlsEnum.INFO + "/photo not sent! Try again!");
    }
  };

  return (
    <WrapperPage>
      <StyledApproveSelfie>
        <StyledSelfieHeader>Take selfie</StyledSelfieHeader>
        <ButtonClose color="white" />

        <StyledSelfieText>Drag and zoom image to crop</StyledSelfieText>
        <StyledCropperWrapper>
          <Cropper
            image={image || avatar || ""}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropSize={{ width: 285, height: 285 }}
          />
        </StyledCropperWrapper>
        <StyledSelfieButtonPanel>
          <input
            type="file"
            accept="image/*"
            ref={inputRef as React.MutableRefObject<HTMLInputElement>}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <StyledSaveSelfieBtn
            itFilled={false}
            onClick={triggerFileSelectPopup}
          >
            Retake
          </StyledSaveSelfieBtn>
          <StyledSaveSelfieBtn itFilled={true} onClick={downloadImage}>
            Save
          </StyledSaveSelfieBtn>
        </StyledSelfieButtonPanel>
      </StyledApproveSelfie>
    </WrapperPage>
  );
};

export default ApproveSelfie;
