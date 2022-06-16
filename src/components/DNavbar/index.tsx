import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { APP_API_PATH, APP_LOGO_DARK, APP_LOGO_LIGHT, APP_NAME } from '../../config';
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

    const handleSearchToggle = (event: any) => {
        if (searchAnchor) {
            handleOpenSearch(event);
        } else {
            handleCloseSearch();
        }
    };

    const theme = useTheme();

    const colorMode: any = useContext(colorModeContext);

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

    if (location.pathname.includes('/settings')) return <></>;

    const isSearchOpen = Boolean(searchAnchor);

    return (
        <Box>
            <StyledAppBar elevation={0} position='fixed'>
                <Toolbar variant='dense'>
                    <LeftMenuToggle size='large' edge='start' color='inherit' aria-label='menu'>
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
                        <SearchWrapper onClick={handleSearchToggle}>
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
                        {/* <DButton variant="contained" color="primary">Login</DButton> */}
                        <AvatarButtonWrapper onClick={handleOpenUserMenu}>
                            <Avatar alt='Alken Dester' />
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
                                    alt='Alken Dester'
                                />
                                <Box>
                                    <Typography>Alken Dester</Typography>
                                    <Typography>desteralken@gmail.com</Typography>
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
        </Box>
    );
};

export default DNavbar;
