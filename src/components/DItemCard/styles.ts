import Box, { BoxProps } from '@mui/material/Box';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const PlayButton = styled(Box)<BoxProps>(() => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    opacity: '0',
    '& i': {
        color: '#ffffff',
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
    backgroundColor: '#000000',
}));

export const BottomButtonWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    bottom: '0',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    opacity: '0',
}));

export const Button = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    height: '40px',
    width: '40px',
    color: '#FF007A',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    backdropFilter: 'blur(10px)',
    transition: '0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

export const CardTitle = styled(Typography)<TypographyProps>(() => ({
    padding: '10px',
}));

export const Card = styled('div')(({ theme }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    '&:hover .imageWrapper': {
        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.8)}`,
    },
    '&:hover .imageWrapper .playButton': {
        opacity: '1',
    },
    '&:hover .imageWrapper .image': {
        opacity: '0.2',
    },
    '&:hover .bottomButtonWrapper': {
        opacity: '1',
        color: theme.palette.primary.main,
    },
    '& *': {
        transition: '0.2s ease-in',
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
}));
