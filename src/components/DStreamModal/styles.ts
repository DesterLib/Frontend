import Dialog, { DialogProps } from '@mui/material/Dialog';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

export const InfoModal = styled(Dialog)<DialogProps>(({ theme }) => ({
    '& .Dester-DialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
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

export const CloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    position: 'absolute',
    right: '8px',
    top: '8px',
    backgroundColor: alpha(theme.palette.text.primary, 0.5),
    backdropFilter: 'blur(10)',
    color: theme.palette.background.default,
    '&:hover': {
        color: theme.palette.background.default,
        backgroundColor: alpha(theme.palette.text.primary, 1),
    },
}));
