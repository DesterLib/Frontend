import { Box } from '@mui/material';
import React from 'react';

import CardSlider from 'components/cardslider';

type Props = {};

const HomePage = (props: Props) => {
    return (
        <Box sx={{ height: '100%' }}>
            <CardSlider title='Popular Movies' />
        </Box>
    );
};

export default HomePage;
