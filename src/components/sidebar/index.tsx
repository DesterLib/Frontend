import { Avatar, Box, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { motion } from 'framer-motion';
import app from 'main/config';
import React from 'react';
import guid from 'utils/guid';

import Icon from 'components/icon';
import { useDispatch, useSelector } from 'react-redux';

interface StyledSideBarCotainerProps {
    sideBarLabels: boolean;
}

const StyledSideBarCotainer = styled(Box, {
    shouldForwardProp: (propName: string) => propName !== 'sideBarLabels',
})<StyledSideBarCotainerProps>(({ theme, sideBarLabels }) => ({
    width: 'fit-content',
    minWidth: sideBarLabels ? '200px' : 'fit-content',
    height: '100vh',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
}));

const StyledList = styled(List)({
    padding: '5px',
});

const StyledListItem = styled(ListItem)({
    marginBottom: '5px',
    width: '100%',
    height: '50px',
    '&:last-child': {
        marginBottom: '0px',
    },
});

const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    height: 'fit-content',
    width: '100%',
    padding: '0px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        boxShadow: `${theme.palette.primary.light} 0px 8px 24px`,
        color: theme.palette.common.white,
    },
}));

type SideBarProps = {
    sideBarLabels: boolean;
    sx: any;
};

const SideBar = React.forwardRef((props: SideBarProps, ref: any) => {
    const { sideBarLabels, sx } = props;
    const currentTheme = useSelector((state: any) => state.darkMode.darkMode);
    const dispatch = useDispatch();
    return (
        <StyledSideBarCotainer ref={ref} sideBarLabels={sideBarLabels} sx={sx}>
            <StyledList sx={{ width: sideBarLabels ? '100%' : 'fit-content' }}>
                {app.navbar.side.items.top.map((item) => (
                    <StyledListItem key={guid()} disablePadding>
                        <StyledNavItem
                            // @ts-ignore
                            whileHover={{ scale: 1.02 }}
                            // @ts-ignore
                            whileTap={{ scale: 0.98 }}
                            // @ts-ignore
                            component={motion.button}
                        >
                            <Icon
                                style={{
                                    aspectRatio: '1/1',
                                    height: '50px',
                                    width: '50px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                name={item.icon}
                            />
                            {sideBarLabels && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        minWidth: 'fit-content',
                                        padding: '0px 15px',
                                    }}
                                >
                                    {item.label}
                                </Box>
                            )}
                        </StyledNavItem>
                    </StyledListItem>
                ))}
            </StyledList>
            <StyledList>
                {app.navbar.side.items.bottom.map((item) =>
                    item.type === 'auth' ? (
                        <ListItem key={guid()} disablePadding>
                            <StyledNavItem
                                // @ts-ignore
                                whileHover={{ scale: 1.02 }}
                                // @ts-ignore
                                whileTap={{ scale: 0.98 }}
                                // @ts-ignore
                                component={motion.button}
                            >
                                {!item.authStatus && (
                                    <Icon
                                        name='logout'
                                        style={{
                                            aspectRatio: '1/1',
                                            height: '50px',
                                            width: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    />
                                )}
                                {item.authStatus && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                aspectRatio: '1/1',
                                                height: '50px',
                                                width: '50px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar src={item.data.image} />
                                        </Box>
                                        {sideBarLabels && (
                                            <ListItemText
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    minWidth: 'fit-content',
                                                    padding: '0px 15px',
                                                }}
                                                primary='Photos'
                                            />
                                        )}
                                    </Box>
                                )}
                            </StyledNavItem>
                        </ListItem>
                    ) : (
                        <StyledListItem key={guid()} disablePadding>
                            <StyledNavItem
                                // @ts-ignore
                                whileHover={{ scale: 1.02 }}
                                // @ts-ignore
                                whileTap={{ scale: 0.98 }}
                                // @ts-ignore
                                component={motion.button}
                                onClick={item.onClick}
                            >
                                {item.type === 'toggle' && (
                                    <>
                                        {currentTheme ? (
                                            <Icon
                                                style={{
                                                    aspectRatio: '1/1',
                                                    height: '50px',
                                                    width: '50px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                name='light_mode'
                                            />
                                        ) : (
                                            <Icon
                                                style={{
                                                    aspectRatio: '1/1',
                                                    height: '50px',
                                                    width: '50px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                name='nights_stay'
                                            />
                                        )}
                                    </>
                                )}
                                {item.type !== 'toggle' && (
                                    <Icon
                                        style={{
                                            aspectRatio: '1/1',
                                            height: '50px',
                                            width: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        name={item.icon || ''}
                                    />
                                )}
                                {sideBarLabels && (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'left',
                                            alignItems: 'center',
                                            minWidth: 'fit-content',
                                            padding: '0px 15px',
                                        }}
                                    >
                                        {item.label}
                                    </Box>
                                )}
                            </StyledNavItem>
                        </StyledListItem>
                    ),
                )}
            </StyledList>
        </StyledSideBarCotainer>
    );
});

export default SideBar;
