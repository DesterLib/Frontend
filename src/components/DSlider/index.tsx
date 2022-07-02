import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React, { Fragment, useRef } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { SwiperSlide } from 'swiper/react';

import DItemCard from '../DItemCard';
import DPersonCard from '../DPersonCard';
import DSeasonCard from '../DSeasonCard';
import DVideoCard from '../DVideoCard';
import { DSliderHeading, DSwiper, MainContainer, SubContainer } from './styles';

const DSlider = ({ title, type, itemData, variant }: any) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    SwiperCore.use([Navigation]);
    return (
        <Fragment>
            {variant === 'item' && (
                <Fragment>
                    {itemData && Object.keys(itemData).length !== 0 ? (
                        <MainContainer>
                            <SubContainer>
                                <DSliderHeading variant='h5'>{title || null}</DSliderHeading>
                                <Box>
                                    <IconButton
                                        ref={navigationPrevRef}
                                        sx={{ marginRight: '10px' }}
                                    >
                                        <i className='ri-arrow-left-s-line'></i>
                                    </IconButton>
                                    <IconButton ref={navigationNextRef}>
                                        <i className='ri-arrow-right-s-line'></i>
                                    </IconButton>
                                </Box>
                            </SubContainer>
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
                                        <DItemCard item={item} type={type} />
                                    </SwiperSlide>
                                ))}
                            </DSwiper>
                        </MainContainer>
                    ) : null}
                </Fragment>
            )}
            {variant === 'season' && (
                <Fragment>
                    {itemData && Object.keys(itemData).length ? (
                        <MainContainer>
                            <SubContainer>
                                <DSliderHeading variant='h5'>{title || null}</DSliderHeading>
                                <Box>
                                    <IconButton
                                        ref={navigationPrevRef}
                                        sx={{ marginRight: '10px' }}
                                    >
                                        <i className='ri-arrow-left-s-line'></i>
                                    </IconButton>
                                    <IconButton ref={navigationNextRef}>
                                        <i className='ri-arrow-right-s-line'></i>
                                    </IconButton>
                                </Box>
                            </SubContainer>
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
                                {Object.keys(itemData.seasons).map((k: string, i: number) => (
                                    <SwiperSlide key={i}>
                                        <DSeasonCard data={itemData} type={type} seasonKey={k} />
                                    </SwiperSlide>
                                ))}
                            </DSwiper>
                        </MainContainer>
                    ) : null}
                </Fragment>
            )}
            {variant === 'people' && (
                <Fragment>
                    {itemData && Object.keys(itemData).length !== 0 ? (
                        <MainContainer>
                            <SubContainer>
                                <DSliderHeading variant='h5'>{title || null}</DSliderHeading>
                                <Box>
                                    <IconButton
                                        ref={navigationPrevRef}
                                        sx={{ marginRight: '10px' }}
                                    >
                                        <i className='ri-arrow-left-s-line'></i>
                                    </IconButton>
                                    <IconButton ref={navigationNextRef}>
                                        <i className='ri-arrow-right-s-line'></i>
                                    </IconButton>
                                </Box>
                            </SubContainer>
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
                                        <DPersonCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </DSwiper>
                        </MainContainer>
                    ) : null}
                </Fragment>
            )}
            {variant === 'video' && (
                <Fragment>
                    {itemData && Object.keys(itemData).length !== 0 ? (
                        <MainContainer>
                            <SubContainer>
                                <DSliderHeading
                                    sx={{
                                        padding: '0px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    variant='h5'
                                >
                                    {title || null}
                                </DSliderHeading>
                                <Box>
                                    <IconButton
                                        ref={navigationPrevRef}
                                        sx={{ marginRight: '10px' }}
                                    >
                                        <i className='ri-arrow-left-s-line'></i>
                                    </IconButton>
                                    <IconButton ref={navigationNextRef}>
                                        <i className='ri-arrow-right-s-line'></i>
                                    </IconButton>
                                </Box>
                            </SubContainer>
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
                                        <DVideoCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </DSwiper>
                        </MainContainer>
                    ) : null}
                </Fragment>
            )}
        </Fragment>
    );
};

export default DSlider;
