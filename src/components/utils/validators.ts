export const isValidInput = (
  value: string,
  type: "phone" | "mmyy" | "cardnumber" | "cvc" | undefined
): boolean => {
  if (type === "phone" && value.length > 14) {
    return true;
  }

  if (
    type === "mmyy" &&
    value.length > 4 &&
    +value.split("/")[0] < 13 &&
    +value.split("/")[1] > 22
  ) {
    return true;
  }

  if (type === "cardnumber" && value.length > 18) {
    return true;
  }

  if (type === "cvc" && value.length > 2) {
    return true;
  }

  return false;
};
