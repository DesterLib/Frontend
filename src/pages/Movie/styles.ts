import Box, { BoxProps } from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import { alpha, styled } from '@mui/material/styles';

export const StyledChipInfo = styled(Chip)<ChipProps>(({ theme }) => ({
    padding: '0px 5px',
    margin: theme.spacing(0.5),
    background: `linear-gradient(45deg, ${theme.palette.error.dark} 0%, ${theme.palette.error.light} 100%)`,
    color: '#ffffff',
}));

export const StyledChipGenre = styled(Chip)<ChipProps>(({ theme }) => ({
    padding: '0px 5px',
    margin: theme.spacing(0.5),
    background: `linear-gradient(45deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.light} 100%)`,
    color: '#ffffff',
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
        background: `linear-gradient( 45deg, ${theme.palette.background.default} 20%, ${alpha(
            theme.palette.background.paper,
            0.5,
        )} 70%, rgba(0, 0, 0, 0) 100% )`,
    },
    [theme.breakpoints.down('md')]: {
        background: `linear-gradient( 45deg, ${theme.palette.background.default} 20%, ${alpha(
            theme.palette.background.paper,
            0.5,
        )} 70%, rgba(0, 0, 0, 0) 100% ), linear-gradient( 325deg, ${
            theme.palette.background.paper
        } 20%, ${alpha(theme.palette.background.paper, 0.5)} 70%, rgba(0, 0, 0, 0) 100% )`,
    },
}));
