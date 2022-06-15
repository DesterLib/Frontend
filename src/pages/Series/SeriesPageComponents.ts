import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

export const ItemBackground = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        paddingBottom: '40.25%',
        width: '100% !important',
    },
    [theme.breakpoints.down('md')]: {
        paddingBottom: '150%',
        marginTop: '48px',
    },
}));

export const HeaderImage = styled('img')(() => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: '5',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
}));

export const PosterImage = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    maxWidth: '200px',
}));

export const LinearGradient = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: '10',
    [theme.breakpoints.up('md')]: {
        background:
            'linear-gradient( 90deg, rgba(2, 22, 31, 1) 6%, rgba(1, 9, 12, 0.5032606792717087) 70%, rgba(0, 0, 0, 0) 100% )',
    },
    [theme.breakpoints.down('md')]: {
        background:
            'linear-gradient( 0deg, rgba(2, 22, 31, 1) 40%, rgba(2, 16, 22, 0.7721682422969187) 68%, rgba(1, 9, 12, 0.5032606792717087) 80%, rgba(0, 0, 0, 0) 100% )',
    },
}));
