import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    alpha,
    styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import app from 'main/config';
import React from 'react';
import guid from 'utils/guid';

import Icon from 'components/icon';

type SideBarProps = {};

const StyledSideBarCotainer = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    maxWidth: 'fit-content',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
}));

const StyledList = styled(List)({
    padding: '5px',
    width: 'fit-content',
});

const StyledListItem = styled(ListItem)({
    marginBottom: '5px',
    // width: 'fit-content',
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
    width: 'fit-content',
    // maxWidth: '50px',
    // minWidth: '50px',
    padding: '0px',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
    },
}));

const SideBar = (props: SideBarProps) => {
    return (
        <StyledSideBarCotainer>
            <StyledList>
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
                        </StyledNavItem>
                    </StyledListItem>
                ))}
            </StyledList>
            <StyledList>
                {app.navbar.side.items.bottom.map((item) => (
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
                                    name='login'
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
                                <Box sx={{ display: 'flex' }}>
                                    <ListItemAvatar>
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
                                    </ListItemAvatar>
                                    <ListItemText primary='Photos' secondary='Jan 9, 2014' />
                                </Box>
                            )}
                        </StyledNavItem>
                    </ListItem>
                ))}
            </StyledList>
        </StyledSideBarCotainer>
    );
};

export default SideBar;
