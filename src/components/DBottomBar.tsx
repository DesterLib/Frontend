import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/system';
import React from 'react';

const DBottomBar = () => {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const BoxStyles = {
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
    };

    return (
        <Box sx={BoxStyles}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label='Home'
                    icon={<i style={{ fontSize: '22px' }} className='ri-home-fill'></i>}
                />
                <BottomNavigationAction
                    label='Search'
                    icon={<i style={{ fontSize: '22px' }} className='ri-search-2-fill'></i>}
                />
                <BottomNavigationAction
                    label='Collections'
                    icon={<i style={{ fontSize: '22px' }} className='ri-stack-fill'></i>}
                />
                <BottomNavigationAction
                    label='Settings'
                    icon={<i style={{ fontSize: '22px' }} className='ri-settings-2-fill'></i>}
                />
            </BottomNavigation>
        </Box>
    );
};

export default DBottomBar;
