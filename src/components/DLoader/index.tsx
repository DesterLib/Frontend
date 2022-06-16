import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import React from 'react';

import { MainWrapper } from './styles';

const DLoader = () => {
    return (
        <MainWrapper>
            <CircularProgress
                size={50}
                thickness={4.6}
                sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
            />
        </MainWrapper>
    );
};

export default DLoader;
