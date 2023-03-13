import classes from "./FormElements.module.scss";
import {
  FormLabelProps,
  FormCodeInputCellProps,
  FormCodeInputProps,
  FormErrorMessageProps,
  FormInputProps,
  FormMainProps,
  FormDescriptionWrapperProps,
  FormCheckboxProps,
} from "./FormElements.types";

import checkmarkSVG from "@images/checkbox_checkmark.svg";
import { CODE_REGEXP } from "@/components/utils/regexp";
import { INPUT_CELLS_AMOUNT } from "@const";

export const FormLabel = (props: FormLabelProps) => {
  return <label className={classes.formLabel}>{props.text}</label>;
};

export const FormLabelPhone = (props: FormLabelProps) => {
  const getHelpHandler = () => {
    alert(
      "To get the code, follow this link <a href='https://t.me/framology_bot'>@framology_bot</a> then write '/getCode' or '/resetCode' in case you need to re-send the code"
    );
  };

  return (
    <label
      onClick={getHelpHandler}
      className={classes.formLabel__phone}
      title={"Click here if you need help"}
    >
      <span>Enter the code sent to </span>
      {props.text}
    </label>
  );
};

export const FormErrorMessage = (props: FormErrorMessageProps) => {
  return <div className={classes.formErrorMessage}>{props.text}</div>;
};

export const FormInput = (props: FormInputProps) => {
  return (
    <input
      className={
        props.inputIsValid ? classes.formInput : classes.formInputInvalid
      }
      type={props.inputType}
      name={props.inputName}
      onChange={props.onChangeHandler}
      value={props.inputValue}
      maxLength={300}
      placeholder={props.placeholder}
    />
  );
};

export const FormInputSmall = (props: FormInputProps) => {
  return (
    <input
      className={
        props.inputIsValid
          ? classes.formInput_small
          : classes.formInputInvalid_small
      }
      type={props.inputType}
      name={props.inputName}
      onChange={props.onChangeHandler}
      value={props.inputValue}
      maxLength={300}
      placeholder={props.placeholder}
    />
  );
};

// const FormCodeInputCell = (props: FormCodeInputCellProps) => {
//   return (
//     <input
//       className={classes.formCodeInput}
//       type="number"
//       name={props.inputName}
//       onChange={props.onChangeHandler}
//       onKeyDown={props.onKeyDownHandler}
//       maxLength={1}
//     />
//   );
// };

export const FormCodeInput = (props: {
  otp: string[];
  setOtp: (otp: string[]) => void;
  inputRef: any;
  activeOtpIndex: number;
  cellChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  clearCellHandler: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => void;
}) => {
  return (
    <div className={classes.codeConfirmBox}>
      {new Array(INPUT_CELLS_AMOUNT).fill(0).map((item, index) => {
        return (
          <input
            ref={index === props.activeOtpIndex ? props.inputRef : null}
            className={classes.formCodeInput}
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
    </div>
  );
};

export const FormMain = (props: FormMainProps) => {
  return (
    <form
      onSubmit={props.onFormSubmit}
      className={classes.formMain}
      method="POST"
      name={props.formName}
    >
      {props.children}
    </form>
  );
};

export const FormDescriptionWrapper = (props: FormDescriptionWrapperProps) => {
  return (
    <div
      className={
        props.width === "small"
          ? classes.formDescription_small
          : classes.formDescription
      }
    >
      {props.children}
    </div>
  );
};

export const FormCheckbox = (props: FormCheckboxProps) => {
  return (
    <label className={classes.formCheckbox}>
      {props.label}
      <input
        className={classes.formCheckbox__box}
        onChange={props.checkboxChangeHandler}
        type="checkbox"
        name="formcheckbox"
        value={props.value}
        checked={props.checked}
      />
      <div className={classes.formCheckbox__checkmark}>
        <img src={checkmarkSVG} alt="checkmark" />
      </div>
    </label>
  );
};
