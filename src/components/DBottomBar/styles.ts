import Box, { BoxProps } from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const DBottomBarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    '& .MuiBottomNavigation-root': {
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
    },
}));
