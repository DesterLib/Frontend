import Dialog, { DialogProps } from '@mui/material/Dialog';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';

export const InfoModal = styled(Dialog)<DialogProps>(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        backgroundColor: alpha('#000000', 1),
        border: '0px',
    },
    '& .MuiDialog-container .MuiDialog-paper': {
        boxShadow: `0px 0px 0px 2px ${theme.palette.background.default}`,
        borderRadius: theme.shape.borderRadius,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const CloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
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
