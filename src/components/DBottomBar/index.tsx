import BottomNavigation from '@mui/material/BottomNavigation';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavMenuItem, DBottomBarWrapper } from './styles';

const DBottomBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <DBottomBarWrapper>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, val) => {
                    setValue(val);
                    if (val == 0) {
                        navigate('/');
                        setIsActive(true);
                    } else if (val == 1) {
                        navigate('/search');
                    } else if (val == 2) {
                        navigate('/settings');
                    }
                }}
            >
                <BottomNavMenuItem
                    label='Home'
                    icon={<i style={{ fontSize: '22px' }} className='ri-home-fill'></i>}
                />
                <BottomNavMenuItem
                    label='Search'
                    icon={<i style={{ fontSize: '22px' }} className='ri-search-2-fill'></i>}
                />
                <BottomNavMenuItem
                    label='Settings'
                    icon={<i style={{ fontSize: '22px' }} className='ri-settings-2-fill'></i>}
                />
            </BottomNavigation>
        </DBottomBarWrapper>
    );
};

export default DBottomBar;
