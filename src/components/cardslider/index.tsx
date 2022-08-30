import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import Card from "components/card";
import "swiper/css";
import Icon from "components/icon";

type Props = {
  title: string;
  items: any;
};

const CardSlider = (props: Props) => {
  const { title, items = [0, 1, 2, 3, 4, 5, 6, 7, 8] } = props;
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  SwiperCore.use([Navigation]);
  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box>
          <IconButton ref={navigationPrevRef} sx={{ marginRight: "10px" }}>
            <Icon name="chevron_left" />
          </IconButton>
          <IconButton ref={navigationNextRef}>
            <Icon name="chevron_right" />
          </IconButton>
        </Box>
      </Box>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        preventClicksPropagation={true}
        preventClicks={true}
        breakpoints={{
          "240": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "385": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "570": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          "760": {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          "940": {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          "1194": {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
      >
        {items.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Card />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CardSlider;
