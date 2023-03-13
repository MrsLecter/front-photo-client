export const getMaskedUserInput = (
  eValue: string,
  mask: string,
  type: "phone" | "mmyy" | "cardnumber" | "cvc" | undefined
): string => {
  if (type === "phone") {
    const maskWihtCode = mask.substring(0, mask.indexOf("(") + 1);

    let unmasked = (userInput: string) => {
      if (!userInput) {
        return "";
      }
      if (userInput.length >= 1) {
        let substr = userInput.substring(userInput.indexOf("(") + 1);
        if (userInput.indexOf("(") < 0) {
          return "";
        }
        let onlyNumber = substr.match(/[0-9]/g);
        return onlyNumber ? onlyNumber!.join("") : "";
      } else {
        return "";
      }
    };

    let clearInput = unmasked(eValue);
    if (clearInput.length === 0) {
      return maskWihtCode;
    } else if (clearInput.length === 1) {
      return maskWihtCode + clearInput;
    } else if (clearInput.length > 0 && clearInput.length < 4) {
      return maskWihtCode + clearInput;
    } else if (clearInput.length === 4) {
      return maskWihtCode + clearInput.substring(0, 3) + ")" + clearInput[3];
    } else if (clearInput.length === 7) {
      return (
        maskWihtCode +
        +clearInput.substring(0, 3) +
        ")" +
        clearInput.substring(3, 6) +
        "-" +
        clearInput[6]
      );
    } else if (clearInput.length < 11) {
      return eValue;
    }
  }

  if (type === "mmyy") {
    const unmasked = (userInput: string) => {
      if (!userInput) {
        return "";
      }
      let only_number = userInput.match(/[0-9]/g);
      if (!only_number) {
        return "";
      }
      return only_number!.join("") || "";
    };
    const clearInput = unmasked(eValue);
    if (clearInput.length === 0) {
      return "";
    } else if (clearInput.length === 1) {
      return clearInput;
    } else if (clearInput.length > 2 && clearInput.length <= 4) {
      return clearInput.substring(0, 2) + "/" + clearInput.substring(2, 4);
    } else if (clearInput.length >= 4) {
      return eValue;
    }
  }

  if (type === "cardnumber") {
    const unmasked = (userInput: string) => {
      if (!userInput) {
        return "";
      }
      let only_number = userInput.match(/[0-9]/g);
      if (!only_number) {
        return "";
      }
      return only_number!.join("") || "";
    };
    const clearInput = unmasked(eValue);
    if (clearInput.length === 0) {
      return "";
    } else if (clearInput.length === 1) {
      return clearInput;
    } else if (clearInput.length === 5) {
      return clearInput.substring(0, 4) + " " + clearInput[4];
    } else if (clearInput.length === 9) {
      return (
        clearInput.substring(0, 4) +
        " " +
        clearInput.substring(4, 8) +
        " " +
        clearInput[8]
      );
    } else if (clearInput.length === 13) {
      return (
        clearInput.substring(0, 4) +
        " " +
        clearInput.substring(4, 8) +
        " " +
        clearInput.substring(8, 12) +
        " " +
        clearInput[12]
      );
    } else if (clearInput.length > 13) {
      return (
        clearInput.substring(0, 4) +
        " " +
        clearInput.substring(4, 8) +
        " " +
        clearInput.substring(8, 12) +
        " " +
        clearInput.substring(12, 16)
      );
    } else if (clearInput.length >= 19) {
      return eValue;
    }
  }

  if (type === "cvc") {
    const unmasked = (userInput: string) => {
      if (!userInput) {
        return "";
      }
      let only_number = userInput.match(/[0-9]/g);
      if (!only_number) {
        return "";
      }
      return only_number!.join("") || "";
    };
    const clearInput = unmasked(eValue);
    return clearInput;
  }
  return eValue.substring(0, mask.length);
};
