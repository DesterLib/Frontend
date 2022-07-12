import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const DBottomBarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    '& .Dester-BottomNavigation-root': {
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(10px)',
    },
}));

export const BottomNavMenuItem = styled(BottomNavigationAction)<any>(({ theme }) => ({
    borderRadius: '10px',
    padding: '5px 0px',
    transition: '0.2s ease-out',
    '.Dester-BottomNavigationAction-root': {
        color: theme.palette.text.primary,
    },
    '&.Dester-BottomNavigationAction-root div div': {
        transition: '0.2s ease-out',
        backgroundColor: theme.palette.background.paper,
    },
    '.material-symbols-rounded': {
        padding: '4px 15px',
        borderRadius: '25px',
    },
    '&.Mui-selected': {
        color: theme.palette.text.primary,
    },
    '&.Mui-selected div div': {
        borderRadius: '25px',
        opacity: '1',
        backgroundColor: theme.palette.background.default,
    },
}));
