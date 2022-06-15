import BottomNavigationAction, {
    BottomNavigationActionProps,
} from '@mui/material/BottomNavigationAction';
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

export const BottomNavMenuItem = styled(BottomNavigationAction)<BottomNavigationActionProps>(
    ({ theme }) => ({
        '&.Dester-BottomNavigationAction-root': {
            color: theme.palette.text.primary,
        },
        '&.Mui-selected': {
            color: `${theme.palette.mode === 'light' ? '#000000' : theme.palette.primary.dark}`,
        },
    }),
);
