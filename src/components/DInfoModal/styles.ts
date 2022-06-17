import Box, { BoxProps } from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

export const InfoModal = styled(Dialog)(({ theme }) => ({
    '& .Dester-DialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: alpha('#000000', 1),
        border: '0px',
    },
    '& .Dester-Dialog-container .Dester-Dialog-paper': {
        boxShadow: `0px 0px 0px 2px ${theme.palette.background.default}`,
        borderRadius: theme.shape.borderRadius,
    },
    '& .Dester-DialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const InfoModalBackdrop = styled(Box)(() => ({
    width: '100%',
    paddingBottom: '40%',
    position: 'relative',
}));

export const ButtonWrapper = styled(Box)(() => ({
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
}));

export const InfoModalBackdropWrapper = styled(Box)(() => ({
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.06) 85%, rgba(0,0,0,0) 100%)',
    position: 'absolute',
    width: '100%',
    height: '100%',
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: '8px',
    top: '8px',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    backdropFilter: 'blur(10)',
    color: '#ffffff',
    '&:hover': {
        color: '#ffffff',
        backgroundColor: alpha(theme.palette.background.default, 1),
    },
}));

export const ModalImage = styled('img')(() => ({
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
}));

export const ChipContainer = styled(Box)<BoxProps>(() => ({
    marginRight: '0px',
    marginLeft: 'auto',
}));

export const StyledChip = styled(Chip)<ChipProps>(({ theme }) => ({
    padding: '0px 5px',
    marginLeft: '5px',
    backgroundColor: alpha(theme.palette.secondary.main, 0.8),
    color: '#ffffff',
}));
