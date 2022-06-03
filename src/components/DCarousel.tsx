import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { A11y, Autoplay, EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
    APP_API_PATH,
    APP_API_VERSION_PATH,
    APP_BACKDROP_QUALITY,
    APP_POSTER_QUALITY,
} from '../config';
import styles from '../styles/DCarousel.module.css';
import useBreakpoint from '../utilities/useBreakpoint';
import DButton from './DButton';

const chipCss = {
    px: 1,
    mr: 1,
    color: '#ffffff',
    backgroundColor: '#ffffff24',
    boxShadow: 'inset 0px 0px 0px 2px #00000057',
};

/*
interface ItemBackgroundProps {
  poster?: string;
  backdrop?: string;
  theme?: Theme;
}
*/

const ItemBackground = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
}));

const HeaderImage = styled('img')(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    boxSizing: 'border-box',
    padding: '0',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0',
    height: '0',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
}));

const HeaderLogo = styled('img')(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    boxSizing: 'border-box',
    padding: '0',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0',
    height: '0',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxGeight: '100%',
    objectFit: 'contain',
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

const DSlide = ({ item, type }: any) => {
    const breakpoint = useBreakpoint();
    return (
        <div className={styles.carouselItem}>
            <div className={styles.itemInfo}>
                <div className={styles.logo}>
                    <HeaderLogo
                        src={
                            APP_API_PATH +
                            APP_API_VERSION_PATH +
                            '/assets/image/' +
                            APP_POSTER_QUALITY +
                            item.logo_path
                        }
                        alt=''
                    />
                </div>
                <div className={styles.info}>
                    <Typography className={styles.title} align='center' variant='h5'>
                        {item.title}
                    </Typography>
                    <div className={styles.mainInfo}>
                        <Chip className='year' label='2020' sx={chipCss} />
                        <Chip
                            className='rating'
                            icon={<i className='ri-star-fill'></i>}
                            label='8.6'
                            sx={chipCss}
                        />
                        <Chip
                            className='type'
                            label='Movie'
                            sx={chipCss}
                            style={{
                                backgroundColor: '#d9292f55',
                                border: '1px solid #ff411299',
                            }}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/${type}/${item.tmdb_id}`}
                            key={item.id}
                        >
                            <DButton
                                sx={{ marginRight: 2 }}
                                variant='contained'
                                color='primary'
                                startIcon={<i className='ri-play-mini-fill'></i>}
                            >
                                PLAY NOW
                            </DButton>
                        </Link>
                        <DButton
                            startIcon={<i className='ri-add-circle-line'></i>}
                            variant='contained'
                            color='secondary'
                        >
                            ADD TO LIST
                        </DButton>
                    </div>
                </div>
            </div>
            <ItemBackground>
                {breakpoint === 'xs' ? (
                    <HeaderImage
                        src={
                            APP_API_PATH +
                            APP_API_VERSION_PATH +
                            '/assets/image/' +
                            APP_POSTER_QUALITY +
                            item.poster_path
                        }
                        alt={item.title}
                    />
                ) : (
                    <HeaderImage
                        src={
                            APP_API_PATH +
                            APP_API_VERSION_PATH +
                            '/assets/image/' +
                            APP_BACKDROP_QUALITY +
                            item.backdrop_path
                        }
                        alt={item.title}
                    />
                )}
            </ItemBackground>
            {/* <ItemBackground poster={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_POSTER_QUALITY + item.poster_path} backdrop={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_BACKDROP_QUALITY + item.backdrop_path} /> */}
        </div>
    );
};

const DCarousel = ({ type, itemData }: any) => {
    SwiperCore.use([Autoplay, EffectFade, Navigation, A11y]);
    return (
        <Swiper
            effect={'fade'}
            loop
            autoplay
            navigation
            slidesPerView={1}
            className={styles.carousel}
        >
            {itemData &&
                itemData.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className={styles.carouselSlideWrapper}>
                            <DSlide item={item} type={type} />
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};

export default DCarousel;
