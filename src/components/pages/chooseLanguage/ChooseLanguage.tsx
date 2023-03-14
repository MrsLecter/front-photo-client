import React, { useState } from "react";
import { Element } from "react-scroll";
import all_countries from "../../../assets/data/countryDb.json";
import { COMMON_COUNTRIES } from "@const";
import { separateIt } from "../../utils/functions";
import { ICountriesType } from "@/components/types/commonTypes";
import CountryHeader from "./countryHeader/countryHeader";
import { CountryPanel } from "./countryPanel/CountryPanel";
import SeparatorString from "./separatorString/SeparatorString";
import CountryString from "./countryString/CountryString";
import styled from "styled-components";

export const ChooseLanguage = () => {
  const [countriesFound, setCountriesFound] = useState<ICountriesType[]>([]);
  const countiesList = separateIt(all_countries as ICountriesType[]);

  const CommonCountryList = React.useMemo(
    () =>
      COMMON_COUNTRIES.map((item) => {
        return (
          <CountryString
            key={item.id + 600}
            phoneCode={item.phoneCode}
            countryName={item.name}
            countryCode={item.countryCode}
          />
        );
      }),
    [COMMON_COUNTRIES]
  );

  const AllCountryList = React.useMemo(
    () =>
      countiesList.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.separated && (
              <Element key={item.id + 900} name={String(item.name[0])}>
                <SeparatorString
                  key={item.id + 1200}
                  type="letter"
                  label={item.name[0]}
                />
              </Element>
            )}

            <CountryString
              key={item.id + 1600}
              phoneCode={item.phoneCode}
              countryName={item.name}
              countryCode={item.countryCode}
            />
          </React.Fragment>
        );
      }),
    [countiesList]
  );

  return (
    <StyledWrapper>
      <CountryHeader setSearchResult={setCountriesFound} />
      <CountryPanel />
      {countriesFound && countriesFound.length > 0 && (
        <>
          <SeparatorString key={300} type="string" label={"Search result"} />
          {countriesFound && countriesFound.length === 0 ? (
            "Nothing found... "
          ) : (
            <>
              {countriesFound.map((item) => {
                return (
                  <CountryString
                    key={item.id + 600}
                    phoneCode={String(item.phone)}
                    countryName={item.name}
                    countryCode={item.code}
                  />
                );
              })}
            </>
          )}
        </>
      )}

      {countriesFound.length === 0 && (
        <>
          <SeparatorString key={300} type="string" label={"Common countries"} />
          <>{CommonCountryList}</>
          <>{AllCountryList}</>
        </>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const StyledSearchResult = styled.div`
  width: 100%;
  display: column;
`;
