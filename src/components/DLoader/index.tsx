import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

import { MainWrapper } from './styles';

const DLoader = () => {
    return (
        <MainWrapper>
            <CircularProgress />
        </MainWrapper>
    );
};

export default DLoader;
