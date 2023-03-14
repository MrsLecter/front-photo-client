import styled, { css } from "styled-components";

export const StyledFormLabel = styled.label<{ isPhoneLabel: boolean }>`
  font-family: "Futura";
  font-weight: 600;
  font-size: 18px;
  line-height: 23.08px;
  color: #262626;

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 20.51px;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
    line-height: 23.08px;
    width: 420px;
    margin: 0 auto;
  }

  &:hover {
    cursor: ${(props) => (props.isPhoneLabel ? "help" : "default")};
  }
`;

export const StyledFormErrorMessage = styled.div`
  margin-top: -20px;
  height: 18px;
  font-family: "Futura";
  font-weight: 400;
  font-size: 14px;
  line-height: 17.95px;
  color: red;
`;

export const StyledFormMain = styled.form`
  margin-top: 14px;
  width: 345px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledFormDescription = styled.div<{ isSmall: boolean }>`
    box-sizing: border-box;
    width: 345px;
    text-align: start;
    font-family: "Futura";
    font-weight: 400;
    font-size: 14px;
    line-height: 17.95px;
    color: #6d6d6d;
  }

  ${(props) =>
    props.isSmall &&
    css`
      padding-left: 30px;
    `}
`;

export const StyledCodeConfirmBox = styled.div`
  width: 345px;
  height: 40px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledFormCodeInput = styled.input`
  padding: 14px 13px;
  box-sizing: border-box;
  margin: 19px 0px;
  width: 345px;
  height: 40px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #eeeeee;
  background: #f4f4f4;
  font-family: "Futura";
  font-weight: 500;
  font-size: 16px;
  line-height: 20.51px;
  color: #6d6d6d;
  width: 45px;
  padding: 0px;
  text-align: center;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (min-width: 1440px) {
    margin-right: 30px;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const StyledFormInput = styled.input<{
  isSmall: boolean;
  isInvalid: boolean;
}>`
    padding: 14px 13px;
    box-sizing: border-box;
    margin: 19px 0px;
    width: 345px;
    height: 40px;
    border-radius: 10px;
    outline: none;
    border: 1px solid ${(props) => (props.isInvalid ? "#eeeeee" : "red")};
    background: #f4f4f4;
    font-family: "Futura";
    font-weight: 500;
    font-size: 16px;
    line-height: 20.51px;
    color: #6d6d6d;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (min-width: 1440px) {
      width: 420px ${(props) => (props.isSmall ? "341px" : "420px")};
      ${(props) =>
        props.isSmall &&
        css`
          font-size: 18px;
          line-height: 23.08px;
        `}
  }
`;

export const StyledFormCheckbox = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  margin-bottom: 10px;
  padding-left: 30px;
  font-family: "Futura";
  font-weight: 600;
  font-size: 16px;
  line-height: 20.51px;
  color: #262626;

  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #e3e0d8;
    border-radius: 5px;
    background-color: white;
    text-align: center;

    img {
      visibility: hidden;
      width: 13.09px;
      height: 9.6px;
    }
  }

  &:hover input ~ div {
    background-color: #eeeeee;
  }

  input:checked ~ div {
    border: 1px solid #3300cc;
    img {
      visibility: visible;
    }
  }

  div:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ div:after {
    display: block;
  }

  & > div:after {
    left: 3.5px;
    top: 6px;
    width: 13.09px;
    height: 9.6px;
    transform: rotate(135deg);
  }

  @media (min-width: 1440px) {
    font-size: 18px;
    line-height: 23.08px;

    img {
      visibility: hidden;
      width: 15px;
      height: 15px;
    }
  }
`;
