import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { AppUrlsEnum } from "@const";
import React, { useState } from "react";
import { IPhotoObject } from "@/components/types/commonTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import "./styles.css";

const ArtPinsCarousel: React.FC<{ coversList: IPhotoObject[] }> = ({
  coversList,
}) => {
  return (
    <>
      <Swiper
        slidesPerView={3.4}
        spaceBetween={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
        breakpoints={{
          375: {
            slidesPerView: 3.4,
            spaceBetween: 5,
          },
          1440: {
            slidesPerView: 6.4,
            spaceBetween: 5,
          },
        }}
      >
        {coversList.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <a href={"../" + AppUrlsEnum.ALBUM_VIEW + `/${item.album}`}>
                <img src={item.path} alt="cover"></img>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ArtPinsCarousel;
