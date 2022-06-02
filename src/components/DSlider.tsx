import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { Fragment, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import DCard from './DCard';
import DPersonCard from './DPersonCard';
import DVideoCard from './DVideoCard';

const DSwiper = styled(Swiper)(() => ({
    padding: '20px',
    '--swiper-navigation-size': '10px',
    '& .swiper-button-prev': {
        top: '0px',
    },
    '& .swiper-button-next': {
        top: '0px',
    },
}));

const DSlider = ({ title, itemData, variant }: any) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
        <Fragment>
            {itemData && Object.keys(itemData).length !== 0 ? (
                <div style={{ padding: '10px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            sx={{
                                padding: '0px 20px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            variant='h5'
                        >
                            {title || null}
                        </Typography>
                        <Box>
                            <IconButton ref={navigationPrevRef} sx={{ marginRight: '10px' }}>
                                <i className='ri-arrow-left-s-line'></i>
                            </IconButton>
                            <IconButton ref={navigationNextRef}>
                                <i className='ri-arrow-right-s-line'></i>
                            </IconButton>
                        </Box>
                    </Box>
                    {(variant === 'item' || variant === 'people') && (
                        <DSwiper
                            grabCursor={true}
                            watchSlidesProgress={true}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onBeforeInit={(swiper: any) => {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }}
                            breakpoints={{
                                '240': {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                '385': {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                '570': {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                '760': {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                '940': {
                                    slidesPerView: 6,
                                    spaceBetween: 20,
                                },
                                '1194': {
                                    slidesPerView: 7,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {itemData.map((item: any) => (
                                <SwiperSlide key={item.id}>
                                    {variant === 'item' ? <DCard item={item} /> : null}
                                    {variant === 'people' ? <DPersonCard item={item} /> : null}
                                </SwiperSlide>
                            ))}
                        </DSwiper>
                    )}
                    {variant === 'video' && (
                        <DSwiper
                            grabCursor={true}
                            watchSlidesProgress={true}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onBeforeInit={(swiper: any) => {
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }}
                            breakpoints={{
                                '240': {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                '385': {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                '570': {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                '760': {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                '940': {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                '1194': {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {itemData.map((item: any) => (
                                <SwiperSlide key={item.id}>
                                    {variant === 'video' ? <DVideoCard item={item} /> : null}
                                </SwiperSlide>
                            ))}
                        </DSwiper>
                    )}
                </div>
            ) : null}
        </Fragment>
    );
};

export default DSlider;
