// import classes from "./FormElements.module.scss";
import {
  IFormLabelProps,
  IFormErrorMessageProps,
  IFormInputProps,
  IFormCodeInputProps,
  IFormMainProps,
  IFormDescriptionWrapperProps,
  IFormCheckboxProps,
} from "./FormElements.types";

import checkmarkSVG from "@images/checkbox_checkmark.svg";
import {
  StyledFormLabel,
  StyledFormErrorMessage,
  StyledFormMain,
  StyledFormDescription,
  StyledCodeConfirmBox,
  StyledFormCodeInput,
  StyledFormInput,
  StyledFormCheckbox,
} from "./FormElements.styles";
import { CODE_REGEXP } from "@/components/utils/regexp";
import { INPUT_CELLS_AMOUNT } from "@const";

export const FormLabel = (props: IFormLabelProps) => {
  return <StyledFormLabel isPhoneLabel={false}>{props.text}</StyledFormLabel>;
};

export const FormLabelPhone = (props: IFormLabelProps) => {
  const getHelpHandler = () => {
    alert(
      "To get the code, follow this link https://t.me/framology_bot - @framology_bot then write '/getCode' or '/resetCode' in case you need to re-send the code"
    );
  };
  return (
    <StyledFormLabel
      isPhoneLabel={true}
      onClick={getHelpHandler}
      title={"Click here if you need help"}
    >
      <span>Enter the code sent to </span>
      {props.text}
    </StyledFormLabel>
  );
};

export const FormErrorMessage = (props: IFormErrorMessageProps) => {
  return <StyledFormErrorMessage>{props.text}</StyledFormErrorMessage>;
};

export const FormInput = (props: IFormInputProps) => {
  return (
    <StyledFormInput
      isSmall={false}
      isInvalid={props.inputIsValid}
      type={props.inputType}
      name={props.inputName}
      onChange={props.onChangeHandler}
      value={props.inputValue}
      maxLength={300}
      placeholder={props.placeholder}
    />
  );
};

export const FormInputSmall = (props: IFormInputProps) => {
  return (
    <StyledFormInput
      isSmall={true}
      isInvalid={!!props.inputIsValid}
      type={props.inputType}
      name={props.inputName}
      onChange={props.onChangeHandler}
      value={props.inputValue}
      maxLength={300}
      placeholder={props.placeholder}
    />
  );
};

export const FormCodeInput = (props: IFormCodeInputProps) => {
  return (
    <StyledCodeConfirmBox>
      {new Array(INPUT_CELLS_AMOUNT).fill(0).map((item, index) => {
        return (
          <StyledFormCodeInput
            ref={index === props.activeOtpIndex ? props.inputRef : null}
            type="number"
            key={index}
            name={"code-field-" + index}
            onChange={(e) => props.cellChangeHandler(e, index)}
            onKeyDown={(e) => props.clearCellHandler(e, index)}
            maxLength={1}
            value={props.otp[index]}
          />
        );
      })}
    </StyledCodeConfirmBox>
  );
};

export const FormMain = (props: IFormMainProps) => {
  return (
    <StyledFormMain
      onSubmit={props.onFormSubmit}
      method="POST"
      name={props.formName}
    >
      {props.children}
    </StyledFormMain>
  );
};

export const FormDescriptionWrapper = (props: IFormDescriptionWrapperProps) => {
  return (
    <StyledFormDescription isSmall={props.width === "small"}>
      {props.children}
    </StyledFormDescription>
  );
};

export const FormCheckbox = (props: IFormCheckboxProps) => {
  return (
    <StyledFormCheckbox>
      {props.label}
      <input
        onChange={props.checkboxChangeHandler}
        type="checkbox"
        name="formcheckbox"
        value={props.value}
        checked={props.checked}
      />
      <div>
        <img src={checkmarkSVG} alt="checkmark" />
      </div>
    </StyledFormCheckbox>
  );
};
