import { styled } from '@mui/material/styles';

export const LogoImage = styled('img')(({ theme }) => ({
    boxsizing: 'border-box',
    padding: '20px',
    border: 'none',
    width: 'auto',
    height: 'auto',
    minWidth: '100px',
    maxWidth: '300px',
    maxHeight: '180px',
    objectFit: 'contain',
    [theme.breakpoints.down('lg')]: {
        maxWidth: '200px',
        maxHeight: '80px',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '80%',
        maxHeight: '150px',
    },
}));
