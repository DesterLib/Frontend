import { Box } from '@mui/material';
import React from 'react';

import CardSlider from 'components/cardslider';
import MainSlider from 'components/mainslider';
import { demodata } from '../../../data';

type Props = {};

const HomePage = (props: Props) => {
    return (
        <Box sx={{ height: '100%' }}>
            <MainSlider items={demodata} />
            <CardSlider title='Popular Movies' items={demodata} random />
            <CardSlider title='Popular Movies' items={demodata} random />
            <CardSlider title='Popular Movies' items={demodata} random />
            <CardSlider title='Popular Movies' items={demodata} random />
            <CardSlider title='Popular Movies' items={demodata} random />
        </Box>
    );
};

export default HomePage;
