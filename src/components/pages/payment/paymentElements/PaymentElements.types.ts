export interface ICityType {
  zipcode: string;
  state_abbr: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
}

export interface IPaymentCardDetailsProps {
  label: string;
  numberValue: string;
  changeNumberHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  expireValue: string;
  changeExpireHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cvcValue: string;
  changeCvcHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidNumber: boolean;
  isValidExpire: boolean;
  isValidCvc: boolean;
}

export interface IPaymentInputProps {
  label: string;
  value: string;
  isValidPayment: boolean;
  changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
