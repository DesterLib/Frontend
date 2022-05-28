import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { debounce } from 'lodash';
// import DButton from '../repeat/DButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { APP_API_PATH, APP_LOGO_LIGHT, APP_NAME } from '../config';
import {
    SearchCardContainer,
    SearchIconWrapper,
    SearchInputBase,
    SearchResults,
    SearchWrapper,
} from './DSearchBar';

const handleDebouncedSearch = debounce(async function (query, setSearchResult) {
    const res = await fetch(`${APP_API_PATH}/api/v1/search?query=${query}&limit=5`);
    const data = (await res.json()) || null;
    setSearchResult(data || { ok: false });
}, 1500);

const LogoImage = styled('img')(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    boxsizing: 'border-box',
    padding: '0',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0',
    height: '0',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
}));

const DNavbar = () => {
    const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResult, setSearchResult] = useState<object>({ ok: false });
    const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);

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

    const theme = useTheme();

    const appBarStyles = {
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
        backdropFilter: 'blur(10px)',
        width: 'calc(100% - 20px)',
        marginTop: '10px',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '5px',
        color: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            marginTop: '0px',
            width: '100%',
            borderRadius: '0px',
        },
    };

    const menuStyles = {
        marginTop: '45px',
        '& .MuiPaper-root': {
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
        '&:last-child:hover': {
            color: '#ff0000',
        },
        '& .MuiAvatar-root': {
            backgroundColor: alpha('#ffffff', 0.1),
            color: '#ffffff',
            transition: '0.2s ease',
        },
        '&:hover .MuiAvatar-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
            color: '#ffffff',
        },
        '&:last-child:hover .MuiAvatar-root': {
            backgroundColor: '#ff0000',
        },
        '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'center',
            '& .icon': {
                paddingRight: '10px',
            },
        },
    };

    const isSearchOpen = Boolean(searchAnchor);

    return (
        <Box>
            <AppBar sx={appBarStyles} elevation={0} position='fixed'>
                <Toolbar variant='dense'>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{
                            padding: '10px',
                            fontSize: '24px',
                            height: '45px',
                            width: '45px',
                        }}
                    >
                        <i className='ri-menu-line'></i>
                    </IconButton>
                    <Box
                        sx={{
                            margin: '0px',
                            fontSize: '0px',
                            position: 'relative',
                            width: '200px',
                            height: '60px',
                            minWidth: '160px',
                            minHeight: '60px',
                        }}
                    >
                        <LogoImage width='160' height='60' src={APP_LOGO_LIGHT} alt={APP_NAME} />
                    </Box>
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
                                <SearchResults>
                                    <SearchCardContainer data={searchResult} />
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
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt='Alken Dester' />
                        </IconButton>
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
                            <MenuItem>
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
                            <MenuItem sx={menuItemStyles}>
                                <Avatar sx={{ marginRight: '10px' }}>
                                    <i className='ri-sun-fill'></i>
                                </Avatar>
                                <Typography textAlign='center'>Light Theme</Typography>
                            </MenuItem>
                            <Link to='/settings' style={{ textDecoration: 'none' }}>
                                <MenuItem sx={menuItemStyles}>
                                    <Avatar sx={{ marginRight: '10px' }}>
                                        <i className='icon ri-settings-2-fill'></i>
                                    </Avatar>
                                    <Typography textAlign='center'>Settings</Typography>
                                </MenuItem>
                            </Link>
                            <MenuItem sx={menuItemStyles}>
                                <Avatar sx={{ marginRight: '10px' }}>
                                    <i className='icon ri-logout-box-fill'></i>
                                </Avatar>
                                <Typography textAlign='center'>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default DNavbar;
