import Dialog, { DialogProps } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

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
