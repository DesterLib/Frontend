import Button, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

export const DButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius as number + 5,
    padding: '10px 15px',
    transition: '0.2s ease',
    lineHeight: '1',
    fontWeight: '500',
    fontFamily: '"Rubik", sans-serif',
    '&.MuiButton-containedPrimary': {
        backgroundColor: theme.palette.primary.light,
        border: `2px solid ${alpha(theme.palette.background.default, 0.1)}`,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.7)}`,
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.dark, 0.7)}`,
        },
    },
    '&.MuiButton-containedSecondary': {
        backgroundColor: alpha('#174453', 0.5),
        backdropFilter: 'blur(10px)',
        border: `2px solid ${alpha(theme.palette.background.paper, 0.6)}`,
        '&:hover': {
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.background.paper, 0.7)}`,
        },
        '&:focus': {
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.background.paper, 0.7)}`,
        },
        '& .MuiButton-startIcon': {
            color: theme.palette.primary.main,
        },
    },
    '& .MuiButton-startIcon': {
        pointerEvents: 'none'
    },
}));