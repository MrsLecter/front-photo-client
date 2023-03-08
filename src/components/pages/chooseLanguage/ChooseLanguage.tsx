import React from "react";
import { Element, Events } from "react-scroll";
import all_countries from "../../../assets/data/countryDb.json";
import { COMMON_COUNTRIES } from "@const";
import { separateIt } from "../../utils/functions";
import { CountriesType } from "@/components/utils/functions.types";
import CountryHeader from "./countryHeader/countryHeader";
import { CountryPanel } from "./countryPanel/CountryPanel";
import SeparatorString from "./separatorString/SeparatorString";
import CountryString from "./countryString/CountryString";
import styled from "styled-components";

export class ChooseLanguage extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  countiesList = separateIt(all_countries as CountriesType[]);

  render() {
    return (
      <StyledWrapper>
        <CountryHeader />
        <CountryPanel />
        <SeparatorString key={300} type="string" label={"Common countries"} />
        <>
          {COMMON_COUNTRIES.map((item) => {
            return (
              <CountryString
                key={item.id + 600}
                phoneCode={item.phoneCode}
                countryName={item.name}
                countryCode={item.countryCode}
              />
            );
          })}
        </>
        <>
          {this.countiesList.map((item, index) => {
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
          })}
        </>
      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;
