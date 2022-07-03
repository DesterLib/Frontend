import Box, { BoxProps } from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const PlayButton = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.background.default, 0.9),
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    transition: '0.2s ease-out',
    opacity: '0',
    '& i': {
        color: theme.palette.text.primary,
        fontSize: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
}));

export const ImageWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    width: '100%',
    paddingBottom: '150%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.contrastText,
    transition: '0.2s ease-out',
}));

export const BottomButtonWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    bottom: '0',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, #ffffff00 100%)`,
    transition: '0.2s ease-out',
    width: '100%',
    opacity: '0',
}));

export const TopButtonWrapper = styled(Box)<BoxProps>(() => ({
    position: 'absolute',
    top: '0',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    transition: '0.2s ease-out',
    width: '100%',
    zIndex: '1',
}));

export const Button = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    height: '40px',
    width: '40px',
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    backdropFilter: 'blur(10px)',
    transition: '0.2s ease-out',
    color: theme.palette.text.primary,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
        color: '#FF007A',
    },
}));

export const CardTitle = styled(Typography)<TypographyProps>(() => ({
    padding: '10px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}));

export const Card = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    transition: '0.2s ease-out',
    '&:hover .imageWrapper': {
        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.dark, 1)}`,
    },
    '&:hover .imageWrapper .playButton': {
        opacity: '1',
    },
    '&:hover .imageWrapper .image': {
        opacity: '0.5',
    },
    '&:hover .bottomButtonWrapper': {
        opacity: '1',
        transition: '0.2s ease-out',
        color: theme.palette.secondary.main,
    },
}));

export const CardWrapper = styled(Box)<BoxProps>(() => ({
    position: 'relative',
    width: '100%',
}));

export const ItemImage = styled('img')(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    boxSizing: 'border-box',
    padding: '0',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0',
    height: '0',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    transition: '0.2s ease-out',
}));
