import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Swiper } from 'swiper/react';

export const DSwiper = styled(Swiper)(() => ({
    padding: '20px',
    '--swiper-navigation-size': '10px',
    '& .swiper-button-prev': {
        top: '0px',
    },
    '& .swiper-button-next': {
        top: '0px',
    },
}));

export const MainContainer = styled(Box)<BoxProps>(() => ({
    padding: '10px',
}));

export const SubContainer = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

export const DSliderHeading = styled(Typography)<TypographyProps>(() => ({
    padding: '0px 20px',
    display: 'flex',
    alignItems: 'center',
}));
