import {
  ICountriesType,
  ICountryTypeInfo,
} from "@/components/types/commonTypes";
import countriesDB from "../../../../assets/data/countryDb.json";
import { useState } from "react";
import styled from "styled-components";

export const SearchBar: React.FC<{
  setSearchHandler: (country: ICountriesType[]) => void;
}> = ({ setSearchHandler }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue) setSearchHandler([]);
    setSearchValue(inputValue);
    const countriesFound = (countriesDB as ICountriesType[]).filter((item) =>
      item.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setSearchHandler(countriesFound);
  };
  return (
    <StyledSearchBar
      pattern="[a-zA-Z]"
      autoFocus={true}
      maxLength={300}
      type="text"
      placeholder="Search country..."
      onChange={handleSearch}
      value={searchValue}
    ></StyledSearchBar>
  );
};

const StyledSearchBar = styled.input`
  width: 180px;
  padding: 5px;
  border-radius: 5px;
  font-family: "Futura";
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.text.language};
  outline: none;
  border: 1px solid ${({ theme }) => theme.text.language};
`;
