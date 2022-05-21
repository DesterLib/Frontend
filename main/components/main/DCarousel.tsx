import Image from "next/image";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { styled, Theme } from '@mui/system';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade, Navigation, A11y } from "swiper";
import styles from "./DCarousel.module.css";
import DButton from "../repeat/DButton";
import { APP_API_PATH, APP_API_VERSION_PATH, APP_BACKDROP_QUALITY, APP_POSTER_QUALITY } from "../../config";
import React from "react";
import useBreakpoint from "../../utilities/useBreakpoint";

const chipCss = {
  px: 1,
  mr: 1,
  color: "#ffffff",
  backgroundColor: "#ffffff24",
  boxShadow: "inset 0px 0px 0px 2px #00000057",
};

interface ItemBackgroundProps {
  poster?: string;
  backdrop?: string;
  theme?: Theme;
}

const ItemBackground = styled('div')(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  zIndex: 5,
}));

// const ItemBackground = styled('div', {
//   shouldForwardProp: (prop) => prop !== "poster" && prop !== "backdrop",
// })<ItemBackgroundProps>(({ theme, poster, backdrop }) => ({
//   backgroundImage: `url(${backdrop})`,
//   position: "absolute",
//   top: 0,
//   right: 0,
//   width: "100%",
//   height: "100%",
//   backgroundSize: "cover",
//   zIndex: 5,
//   [theme.breakpoints.down('md')]: {
//     backgroundImage: `url(${poster})`,
//     backgroundSize: "100%",
//     backgroundRepeat: "no-repeat",
//   },
// }));

const DSlide = ({ item }: any) => {

  const breakpoint = useBreakpoint();
  return(
    <div className={styles.carouselItem}>
      <div className={styles.itemInfo}>
        <div className={styles.logo}>
          <Image
            layout="fill"
            objectFit="contain"
            src={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_POSTER_QUALITY + item.logo}
            alt=""
          />
        </div>
        <div className={styles.info}>
          <Typography className={styles.title} align="center" variant="h5">
            {item.title}
          </Typography>
          <div className={styles.mainInfo}>
            <Chip className="year" label="2020" sx={chipCss} />
            <Chip
              className="rating"
              icon={<i className="ri-star-fill"></i>}
              label="8.6"
              sx={chipCss}
            />
            <Chip
              className="type"
              label="Movie"
              sx={chipCss}
              style={{ backgroundColor: "#d9292f55", border: "1px solid #ff411299" }}
            />
          </div>
          <div className={styles.buttons}>
            <DButton
              sx={{ marginRight: 2 }}
              variant="contained"
              color="primary"
              startIcon={<i className="ri-play-mini-fill"></i>}
            >
              PLAY NOW
            </DButton>
            <DButton startIcon={<i className="ri-add-circle-line"></i>} variant="contained" color="secondary">
              ADD TO LIST
            </DButton>
          </div>
        </div>
      </div>
      <ItemBackground>
        {breakpoint === "xs" ? (
          <Image
            layout="fill"
            objectFit="cover"
            src={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_POSTER_QUALITY + item.poster_url}
          />
        ) : (          
          <Image
            layout="fill"
            objectFit="cover"
            src={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_BACKDROP_QUALITY + item.backdrop_url}
          />
        )}
      </ItemBackground>
    {/* <ItemBackground poster={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_POSTER_QUALITY + item.poster_url} backdrop={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_BACKDROP_QUALITY + item.backdrop_url} /> */}
    </div>
  )
}

const DCarousel = ({ itemData }: any) => {
    SwiperCore.use([Autoplay, EffectFade, Navigation, A11y]);
    return (
        <Swiper
          effect={"fade"}
          loop
          autoplay
          navigation
          slidesPerView={1}
          className={styles.carousel}
        >
          {itemData && itemData.map((item: any) => (
            <SwiperSlide key={item.id}>
              <div className={styles.carouselSlideWrapper}>
                <DSlide item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    );
}

export default DCarousel;