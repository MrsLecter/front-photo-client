import React, { ChangeEvent, FormEvent } from "react";

export interface IFormLabelProps {
  text: string;
  hightlight?: string;
}

export interface IFormErrorMessageProps {
  text: string;
}

export interface IFormInputProps {
  inputIsValid: boolean;
  inputType: string;
  inputName: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  placeholder?: string;
}

export interface IFormCodeInputCellProps {
  inputIsValid?: boolean;
  inputType?: string;
  inputName: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  placeholder?: string;
  onKeyDownHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IFormCodeInputProps {
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
}

export interface IFormMainProps {
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formName: string;
  children: JSX.Element[];
}

export interface IFormDescriptionWrapperProps {
  children: string;
  width?: "small";
}

export interface IFormCheckboxProps {
  value: string;
  label: string;
  checkboxChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}
