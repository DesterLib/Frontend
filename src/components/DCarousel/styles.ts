import Box, { BoxProps } from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
    padding: '0px 5px',
    marginRight: '5px',
    backgroundColor: alpha(theme.palette.secondary.main, 0.8),
    color: '#ffffff'
}));

export const ItemBackground = styled(Box)<BoxProps>(({ theme }) => ({
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        paddingBottom: '40.25%',
        width: '100% !important',
    },
    [theme.breakpoints.down('md')]: {
        paddingBottom: '150%',
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

export const ItemContentWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    zIndex: '20',
    display: 'flex',
    height: 'fit-content',
    flexDirection: 'column',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 'auto',
    marginLeft: '10%',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
        alignItems: 'center',
        marginLeft: 'auto',
        marginBottom: '10px',
    },
}));

export const ItemContentTitleDown = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: '400',
    width: '90%',
    marginBottom: '10px',
    color: '#ffffff',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
}));

export const ItemContentTitleUp = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: '500',
    width: '90%',
    marginBottom: '10px',
    color: '#ffffff',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
    },
}));

export const ItemContentDescription = styled(Typography)<TypographyProps>(({ theme }) => ({
    width: '80%',
    color: '#ffffff',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const StyledGridContainerParent = styled(Grid)<GridProps>(({ theme }) => ({
    marginTop: '20px',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
}));

export const StyledGridContainerChild = styled(Grid)<GridProps>(({ theme }) => ({
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
}));

export const CarouselWrapper = styled(Box)<BoxProps>(() => ({
    width: '100%',
    position: 'relative',
}));
