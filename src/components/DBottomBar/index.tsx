import { Box, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavMenuItem, DBottomBarWrapper } from './styles';

const DBottomBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(0);
    const theme = useTheme();

    return (
        <DBottomBarWrapper>
            <ButtonBase component='div' disableRipple sx={{ display: 'block', width: '100%' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, val) => {
                        setValue(val);
                        if (val == 0) {
                            navigate('/');
                        } else if (val == 1) {
                            navigate('/browse');
                        } else if (val == 2) {
                            navigate('/settings');
                        }
                    }}
                    sx={{ height: 'fit-content' }}
                >
                    <BottomNavMenuItem
                        centerRipple
                        icon={
                            <Box>
                                <Box className='iconWrapper'>
                                    <span className='material-symbols-rounded'>home</span>
                                </Box>
                                <Typography variant='body2'>Home</Typography>
                            </Box>
                        }
                    />
                    <BottomNavMenuItem
                        centerRipple
                        icon={
                            <Box>
                                <Box className='iconWrapper'>
                                    <span className='material-symbols-rounded'>explore</span>
                                </Box>
                                <Typography variant='body2'>Browse</Typography>
                            </Box>
                        }
                    />
                    <BottomNavMenuItem
                        centerRipple
                        icon={
                            <Box>
                                <Box className='iconWrapper'>
                                    <span className='material-symbols-rounded'>more_horiz</span>
                                </Box>
                                <Typography variant='body2'>Settings</Typography>
                            </Box>
                        }
                    />
                </BottomNavigation>
            </ButtonBase>
        </DBottomBarWrapper>
    );
};

export default DBottomBar;
