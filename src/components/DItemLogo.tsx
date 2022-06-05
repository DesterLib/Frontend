import { styled } from '@mui/material/styles';
import React from 'react';

const DItemLogo = ({ src }: any) => {
    const LogoImage = styled('img')(() => ({
        boxsizing: 'border-box',
        padding: '20px',
        border: 'none',
        width: 'auto',
        height: 'auto',
        minWidth: '100px',
        maxWidth: '200px',
        objectFit: 'contain',
    }));
    return <LogoImage src={src} />;
};

export default DItemLogo;
