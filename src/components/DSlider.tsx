import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import DCard from './DCard';

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

const DSlider = ({ title, itemData }: any) => {
    return (
        <React.Fragment>
            {itemData && Object.keys(itemData).length !== 0 ? (
                <div style={{ padding: '20px' }}>
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
                    <IconButton></IconButton>
                    <DSwiper
                        grabCursor={true}
                        watchSlidesProgress={true}
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
                                <DCard item={item} />
                            </SwiperSlide>
                        ))}
                    </DSwiper>
                </div>
            ) : null}
        </React.Fragment>
    );
};

export default DSlider;
