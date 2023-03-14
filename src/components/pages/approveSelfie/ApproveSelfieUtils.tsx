import localStorageHandler from "@/components/utils/local-storage-hendler";
import { dataURItoBlob } from "../../utils/functions";
import { ICrop } from "./ApproveSelfie.types";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any,
  rotation = 0
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  canvas.width = safeArea;
  canvas.height = safeArea;
  ctx!.translate(safeArea / 2, safeArea / 2);
  ctx!.rotate(getRadianAngle(rotation));
  ctx!.translate(-safeArea / 2, -safeArea / 2);
  ctx!.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx!.getImageData(0, 0, safeArea, safeArea);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx!.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );
  return canvas;
}


export const generateDownload = async (imageSrc: string, crop: ICrop) => {
  if (!crop || !imageSrc) {
    return;
  }

  const canvas = await getCroppedImg(imageSrc, crop);
  const imgUrl = canvas.toDataURL("image/png");
  const blob = dataURItoBlob(imgUrl);

  const userName = localStorageHandler
    .getUserData()
    ?.userName?.toLowerCase()
    .replace(" ", "-");
  let formData = new FormData();
  formData.append("selfie", "selfie");

  formData.append(
    "selfie",
    blob,
    `${userName}-selfie-${new Date().getTime()}.png`
  );
  return formData;
};
