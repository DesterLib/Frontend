import { styled } from '@mui/material/styles';
import React from 'react';

const DItemLogo = ({ src }: any) => {
    const LogoImage = styled('img')(({ theme }) => ({
        boxsizing: 'border-box',
        padding: '20px',
        border: 'none',
        width: 'auto',
        height: 'auto',
        minWidth: '100px',
        maxWidth: '300px',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    }));
    return <LogoImage src={src} />;
};

export default DItemLogo;
