import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DBottomBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(0);

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
                onChange={(event, val) => {
                    setValue(val);
                    if (val == 0) {
                        navigate('/');
                    } else if (val == 1) {
                        // open search
                    } else if (val == 2) {
                        navigate('/settings');
                    }
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
                    label='Settings'
                    icon={<i style={{ fontSize: '22px' }} className='ri-settings-2-fill'></i>}
                />
            </BottomNavigation>
        </Box>
    );
};

export default DBottomBar;
