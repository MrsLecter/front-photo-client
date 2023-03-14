import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { AppUrlsEnum, CAROUSEL_ITEMS } from "@const";
import React from "react";

const ArtPinsCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    centerMode: false,
    speed: 800,
    slidesToScroll: 1,
    minDistance: 10,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2.1,
          minDistance: 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          minDistance: 5,
        },
      },
    ],
  };

  return (
    <StyledSliderWrapper>
      <Slider {...settings}>
        {CAROUSEL_ITEMS.map((item) => {
          return (
            <StyledArtistPin key={item.id}>
              <a
                href={
                  "../" +
                  AppUrlsEnum.PHOTO_VIEW +
                  `?photo=${item.path}&album=${item.album}
              &marked=${false}&id=${item.id}`
                }
              >
                <img src={item.path} alt="artPin" />
              </a>
            </StyledArtistPin>
          );
        })}
      </Slider>
    </StyledSliderWrapper>
  );
};

const StyledArtistPin = styled.div`
  width: 44%;
  height: 216px;

  &:active,
  &:hover {
    outline: none;
    border: none;
  }

  img {
    width: calc(100% - 5px);
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  @media screen and (min-width: 1440px) {
    width: 200px;
    height: 255px;

    img {
      width: calc(100% - 10px);
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
`;

const StyledSliderWrapper = styled.div`
  width: 100vw;
  margin-left: 15px;
  margin-top: 21px;
`;

export default ArtPinsCarousel;
