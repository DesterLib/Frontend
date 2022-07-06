import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    APP_API_PATH,
    APP_IS_ELECTRON,
    APP_IS_SEPERATE,
    APP_LOGO_DARK,
    APP_LOGO_LIGHT,
    APP_NAME,
} from '../../config';
import DButton from '../DButton';
import {
    SearchCardContainer,
    SearchIconWrapper,
    SearchInputBase,
    SearchResults,
    SearchWrapper,
} from '../DSearchStyles';
import {
    AvatarButtonWrapper,
    LeftMenuToggle,
    LogoImage,
    LogoWrapper,
    StyledAppBar,
} from './styles';

const handleDebouncedSearch = debounce(async function (query, setSearchResult) {
    const res = await fetch(`${APP_API_PATH}/api/v1/search?query=${query}&limit=5`);
    const data = (await res.json()) || null;
    setSearchResult(data || { ok: false });
}, 1500);

const DNavbar = ({ colorModeContext, themeMode }: any) => {
    const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResult, setSearchResult] = useState<object>({ ok: false });
    const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('/settings')) {
            handleCloseUserMenu();
        }
    }, [location.pathname]);

    const handleOpenUserMenu = (event: any) => {
        setUserMenu(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenu(null);
    };

    const handleChangeSearch = async (event: any) => {
        const query: string = event.target.value || '';
        setSearchQuery(query);
        if (query.length > 2) {
            handleDebouncedSearch(query, setSearchResult);
        } else {
            setSearchResult({ ok: false });
        }
    };

    const handleOpenSearch = (event: any) => {
        setSearchAnchor(event.currentTarget);
    };

    const handleCloseSearch = () => {
        setSearchAnchor(null);
    };

    const handleEditServerUrl = () => {
        localStorage.removeItem('SERVER_URL');
        window.location.reload();
    };

    const theme = useTheme();

    const colorMode: any = useContext(colorModeContext);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsSideBarOpen(!isSideBarOpen);
    };

    const menuStyles = {
        marginTop: '45px',
        '& .Dester-Paper-root': {
            backgroundColor: '#090f12 !important',
        },
    };

    const menuItemStyles = {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#ffffff',
        '&:hover': {
            color: theme.palette.primary.main,
        },
        '& .Dester-Avatar-root': {
            backgroundColor: alpha('#ffffff', 0.1),
            color: '#ffffff',
            transition: '0.2s ease',
        },
        '&:hover .Dester-Avatar-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
            color: '#ffffff',
        },
        '& .Dester-Typography-root': {
            display: 'flex',
            alignItems: 'center',
            '& .icon': {
                paddingRight: '10px',
            },
        },
    };

    const menuLastItemStyles = {
        '&:hover': {
            color: '#ff0000',
        },
        '&:hover .Dester-Avatar-root': {
            backgroundColor: '#ff0000',
        },
    };

    const isSearchOpen = Boolean(searchAnchor);

    if (location.pathname.includes('/settings') || location.pathname.includes('/setup'))
        return <></>;

    return (
        <Box>
            <StyledAppBar elevation={0} position='fixed'>
                <Toolbar variant='dense'>
                    <LeftMenuToggle
                        onClick={toggleDrawer(true)}
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                    >
                        <i className='ri-menu-line'></i>
                    </LeftMenuToggle>
                    <LogoWrapper>
                        <Link to='/'>
                            <LogoImage
                                width='160'
                                height='60'
                                src={themeMode === 'dark' ? APP_LOGO_LIGHT : APP_LOGO_DARK}
                                alt={APP_NAME}
                            />
                        </Link>
                    </LogoWrapper>
                    <Box sx={{ width: '100%', margin: '0px 20px' }}>
                        <SearchWrapper onFocus={handleOpenSearch} onBlur={handleCloseSearch}>
                            <SearchIconWrapper>
                                <i className='ri-search-2-line'></i>
                            </SearchIconWrapper>
                            <SearchInputBase
                                fullWidth
                                placeholder='Search…'
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchQuery}
                                onChange={handleChangeSearch}
                            />
                            {isSearchOpen ? (
                                <SearchResults onMouseDown={(e) => e.preventDefault()}>
                                    <SearchCardContainer
                                        data={searchResult}
                                        handleCloseSearch={handleCloseSearch}
                                    />
                                </SearchResults>
                            ) : null}
                        </SearchWrapper>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'right',
                        }}
                    >
                        {/* <DButton variant='contained' color='primary'>
                            Login
                        </DButton> */}
                        <AvatarButtonWrapper onClick={handleOpenUserMenu}>
                            <Avatar alt='Dester' />
                        </AvatarButtonWrapper>
                        <Menu
                            disableScrollLock={true}
                            sx={menuStyles}
                            id='menu-appbar'
                            anchorEl={userMenu}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(userMenu)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem sx={{ color: '#ffffff' }}>
                                <Avatar
                                    sx={{
                                        marginRight: '10px',
                                        width: 60,
                                        height: 60,
                                    }}
                                    alt='Dester'
                                />
                                <Box>
                                    <Typography>Dester</Typography>
                                    <Typography>desterlib@gmail.com</Typography>
                                </Box>
                            </MenuItem>
                            <Divider />
                            <Link to='/account' style={{ textDecoration: 'none' }}>
                                <MenuItem sx={menuItemStyles}>
                                    <Avatar sx={{ marginRight: '10px' }}>
                                        <i className='ri-user-fill'></i>
                                    </Avatar>
                                    <Typography textAlign='center'>Account</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={colorMode.toggleColorMode} sx={menuItemStyles}>
                                {themeMode === 'dark' && (
                                    <>
                                        <Avatar sx={{ marginRight: '10px' }}>
                                            <i className='ri-sun-fill'></i>
                                        </Avatar>
                                        <Typography textAlign='center'>Light Theme</Typography>
                                    </>
                                )}
                                {themeMode === 'light' && (
                                    <>
                                        <Avatar sx={{ marginRight: '10px' }}>
                                            <i className='ri-moon-clear-fill'></i>
                                        </Avatar>
                                        <Typography textAlign='center'>Dark Theme</Typography>
                                    </>
                                )}
                            </MenuItem>
                            <Link to='/settings' style={{ textDecoration: 'none' }}>
                                <MenuItem sx={menuItemStyles}>
                                    <Avatar sx={{ marginRight: '10px' }}>
                                        <i className='icon ri-settings-2-fill'></i>
                                    </Avatar>
                                    <Typography textAlign='center'>Settings</Typography>
                                </MenuItem>
                            </Link>
                            {(APP_IS_ELECTRON || APP_IS_SEPERATE) && (
                                <MenuItem onClick={handleEditServerUrl} sx={menuItemStyles}>
                                    <Avatar sx={{ marginRight: '10px' }}>
                                        <i className='icon ri-server-fill'></i>
                                    </Avatar>
                                    <Typography textAlign='center'>Server URL</Typography>
                                </MenuItem>
                            )}
                            <Link to='/logout' style={{ textDecoration: 'none' }}>
                                <MenuItem sx={{ ...menuItemStyles, ...menuLastItemStyles }}>
                                    <Avatar sx={{ marginRight: '10px' }}>
                                        <i className='icon ri-logout-box-fill'></i>
                                    </Avatar>
                                    <Typography textAlign='center'>Logout</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <Drawer anchor='left' open={isSideBarOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: '250px' }}>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className='material-symbols-rounded'>history</span>
                            </ListItemIcon>
                            <ListItemText primary='History' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <span className='material-symbols-rounded'>category</span>{' '}
                            </ListItemIcon>
                            <ListItemText primary='Categories' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default DNavbar;
