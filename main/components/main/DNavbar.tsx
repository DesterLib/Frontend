import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import { APP_API_PATH, APP_LOGO_LIGHT, APP_LOGO_DARK, APP_NAME } from '../../config';
import {
    SearchIconWrapper,
    SearchInputBase,
    SearchResults,
    SearchWrapper,
    SearchCardContainer,
} from '../repeat/DSearchBar';
// import DButton from '../repeat/DButton';
import { useContext, useState } from 'react';
import { Divider } from '@mui/material';
import { useTheme } from '@mui/system';

const DNavbar = ({ colorModeContext, themeMode }: any) => {
    const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResult, setSearchResult] = useState<object>({ ok: false });
    const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
    const [lastSearchTime, setLastSearchTime] = useState<number>(0);

    const colorMode: any = useContext(colorModeContext);

    const handleOpenUserMenu = (event: any) => {
        setUserMenu(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setUserMenu(null);
    };

    const handleChangeSearch = async (event: any) => {
        const query: string = event.target.value || '';
        setSearchQuery(query);
        if (query.length > 2 && new Date().getTime() - lastSearchTime > 2500) {
            const res = await fetch(`${APP_API_PATH}/api/v1/search?query=${query}&limit=5`);
            const data = (await res.json()) || null;
            setSearchResult(data);
            setLastSearchTime(new Date().getTime());
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
                        <Image
                            layout='fill'
                            objectFit='contain'
                            src={themeMode === 'dark' ? APP_LOGO_LIGHT : APP_LOGO_DARK}
                            alt={APP_NAME}
                        />
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
                            <MenuItem sx={menuItemStyles}>
                                <Avatar sx={{ marginRight: '10px' }}>
                                    <i className='ri-user-fill'></i>
                                </Avatar>
                                <Typography textAlign='center'>Account</Typography>
                            </MenuItem>
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
                            <MenuItem sx={menuItemStyles}>
                                <Avatar sx={{ marginRight: '10px' }}>
                                    <i className='icon ri-settings-2-fill'></i>
                                </Avatar>
                                <Typography textAlign='center'>Settings</Typography>
                            </MenuItem>
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
