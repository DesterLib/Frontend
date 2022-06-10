import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
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
import DItemLogo from './DItemLogo';

const chipCss = {
    px: 1,
    mr: 1,
    color: '#ffffff',
    backgroundColor: '#ffffff24',
    boxShadow: 'inset 0px 0px 0px 2px #00000057',
};

export const ItemBackground = styled('div')(({ theme }) => ({
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        paddingBottom: '40.25%',
        width: '100% !important',
    },
    [theme.breakpoints.down('md')]: {
        paddingBottom: '150%',
    },
}));

export const HeaderImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '5',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
}));

const LinearGradient = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: '10',
    [theme.breakpoints.up('md')]: {
        background:
            'linear-gradient( 90deg, rgba(2, 22, 31, 1) 6%, rgba(1, 9, 12, 0.5032606792717087) 70%, rgba(0, 0, 0, 0) 100% )',
    },
    [theme.breakpoints.down('md')]: {
        background:
            'linear-gradient( 0deg, rgba(2, 22, 31, 1) 40%, rgba(2, 16, 22, 0.7721682422969187) 68%, rgba(1, 9, 12, 0.5032606792717087) 80%, rgba(0, 0, 0, 0) 100% )',
    },
}));

const DSlide = ({ item, type }: any) => {
    const breakpoint = useBreakpoint();
    const theme = useTheme();
    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <ItemBackground>
                {(breakpoint === 'xs' || breakpoint === 'sm') && (
                    <>
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
                        <LinearGradient />
                    </>
                )}
                {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                    <>
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
                        <LinearGradient />
                    </>
                )}
            </ItemBackground>
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: '20',
                    display: 'flex',
                    height: 'fit-content',
                    flexDirection: 'column',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    marginTop: 'auto',
                    marginLeft: '10%',
                    marginBottom: '30px',
                    [theme.breakpoints.down('md')]: {
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginBottom: '10px',
                    },
                }}
            >
                <DItemLogo src={`https://www.themoviedb.org/t/p/w1280/${item.logo_path}`} />
                {(breakpoint === 'xs' || breakpoint === 'sm') && (
                    <Typography
                        sx={{
                            fontWeight: '400',
                            width: '90%',
                            marginBottom: '10px',
                            [theme.breakpoints.down('md')]: {
                                textAlign: 'center',
                            },
                        }}
                        variant='h5'
                    >
                        {item.title}
                    </Typography>
                )}
                {breakpoint !== 'xs' && breakpoint !== 'sm' && (
                    <Typography
                        sx={{
                            fontWeight: '500',
                            width: '90%',
                            marginBottom: '10px',
                            [theme.breakpoints.down('md')]: {
                                textAlign: 'center',
                            },
                        }}
                        variant='h4'
                    >
                        {item.title}
                    </Typography>
                )}
                <Typography
                    sx={{
                        width: '80%',
                        [theme.breakpoints.down('md')]: {
                            display: 'none',
                        },
                    }}
                    noWrap
                    variant='subtitle1'
                >
                    {item.description}
                </Typography>
                <Grid
                    container
                    sx={{
                        marginTop: '20px',
                        [theme.breakpoints.down('md')]: {
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Grid
                        container
                        sx={{
                            marginBottom: '20px',
                            [theme.breakpoints.down('md')]: {
                                justifyContent: 'center',
                            },
                        }}
                    >
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
                    </Grid>
                    <Grid sx={{ marginRight: '10px' }} item>
                        <DButton
                            variant='contained'
                            color='primary'
                            startIcon={<i className='ri-play-mini-fill'></i>}
                        >
                            PLAY NOW
                        </DButton>
                    </Grid>
                    <Grid sx={{ marginRight: '10px' }} item>
                        <DButton
                            startIcon={<i className='ri-add-circle-line'></i>}
                            variant='contained'
                            color='secondary'
                        >
                            ADD TO LIST
                        </DButton>
                    </Grid>
                    <Grid item>
                        <DButton
                            startIcon={<i className='ri-more-2-fill'></i>}
                            sx={{
                                span: {
                                    margin: '0px',
                                },
                            }}
                            color='secondary'
                            variant='contained'
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
        // <Box sx={{ width: '100%', position: 'relative' }}>
        //     <div className={styles.itemInfo}>
        //         <div className={styles.logo}>
        //             <HeaderLogo
        //                 src={
        //                     APP_API_PATH +
        //                     APP_API_VERSION_PATH +
        //                     '/assets/image/' +
        //                     APP_POSTER_QUALITY +
        //                     item.logo_path
        //                 }
        //                 alt={item.title}
        //             />
        //         </div>
        //         <div className={styles.info}>
        //             <Typography className={styles.title} align='center' variant='h5'>
        //                 {item.title}
        //             </Typography>
        //             <div className={styles.mainInfo}>
        // <Chip className='year' label='2020' sx={chipCss} />
        // <Chip
        //     className='rating'
        //     icon={<i className='ri-star-fill'></i>}
        //     label='8.6'
        //     sx={chipCss}
        // />
        // <Chip
        //     className='type'
        //     label='Movie'
        //     sx={chipCss}
        //     style={{
        //         backgroundColor: '#d9292f55',
        //         border: '1px solid #ff411299',
        //     }}
        // />
        //             </div>
        //             <div className={styles.buttons}>
        //                 <Link
        //                     style={{ textDecoration: 'none' }}
        //                     to={`/${type}/${item.tmdb_id}`}
        //                     key={item.id}
        //                 >
        // <DButton
        //     sx={{ marginRight: 2 }}
        //     variant='contained'
        //     color='primary'
        //     startIcon={<i className='ri-play-mini-fill'></i>}
        // >
        //     PLAY NOW
        // </DButton>
        //                 </Link>
        // <DButton
        //     startIcon={<i className='ri-add-circle-line'></i>}
        //     variant='contained'
        //     color='secondary'
        // >
        //     ADD TO LIST
        // </DButton>
        //             </div>
        //         </div>
        //     </div>
        //     <ItemBackground>
        //         {(breakpoint === 'xs' || breakpoint === 'sm') && (
        //             <>
        //                 <HeaderImage
        //                     src={
        //                         APP_API_PATH +
        //                         APP_API_VERSION_PATH +
        //                         '/assets/image/' +
        //                         APP_POSTER_QUALITY +
        //                         item.poster_path
        //                     }
        //                     alt={item.title}
        //                 />
        //                 <LinearGradient />
        //             </>
        //         )}
        //         {breakpoint !== 'xs' && breakpoint !== 'sm' && (
        //             <>
        //                 <HeaderImage
        //                     src={
        //                         APP_API_PATH +
        //                         APP_API_VERSION_PATH +
        //                         '/assets/image/' +
        //                         APP_BACKDROP_QUALITY +
        //                         item.backdrop_path
        //                     }
        //                     alt={item.title}
        //                 />
        //                 <LinearGradient />
        //             </>
        //         )}
        //     </ItemBackground>
        //     {/* <ItemBackground>
        //         {breakpoint === 'xs' ? (
        //             <HeaderImage
        //                 src={
        //                     APP_API_PATH +
        //                     APP_API_VERSION_PATH +
        //                     '/assets/image/' +
        //                     APP_POSTER_QUALITY +
        //                     item.poster_path
        //                 }
        //                 alt={item.title}
        //             />
        //         ) : (
        //             <HeaderImage
        //                 src={
        //                     APP_API_PATH +
        //                     APP_API_VERSION_PATH +
        //                     '/assets/image/' +
        //                     APP_BACKDROP_QUALITY +
        //                     item.backdrop_path
        //                 }
        //                 alt={item.title}
        //             />
        //         )}
        //     </ItemBackground> */}
        //     {/* <ItemBackground poster={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_POSTER_QUALITY + item.poster_path} backdrop={APP_API_PATH + APP_API_VERSION_PATH + "/assets/image/" + APP_BACKDROP_QUALITY + item.backdrop_path} /> */}
        // </Box>
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
