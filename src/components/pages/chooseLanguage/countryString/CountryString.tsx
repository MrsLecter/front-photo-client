import { getFlagUnicode } from "@/components/utils/functions";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { useNavigate } from "react-router-dom";
import {
  StyledCountryString,
  StyledCountryFlag,
  StyledCountryName,
} from "./CountryString.styles";

const CountryString: React.FC<CountryStringProps> = (props) => {
  const { countryCode, countryName, phoneCode } = props;
  const navigator = useNavigate();

  const sendPhoneCodeHandler = () => {
    navigator(`../?icon=${countryCode}&code=${phoneCode}`);
  };
  console.log("flag", getFlagUnicode(countryCode));
  return (
    <StyledCountryString onClick={sendPhoneCodeHandler}>
      <StyledCountryFlag>
        <img src={findFlagUrlByIso2Code(countryCode)} alt="countryFlag"/></StyledCountryFlag>
      <StyledCountryName>{countryName}</StyledCountryName>
    </StyledCountryString>
  );
};

interface CountryStringProps {
  countryCode: string;
  countryName: string;
  phoneCode: string;
}

export default CountryString;
