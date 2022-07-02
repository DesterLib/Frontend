import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MenuIcon from '@mui/icons-material/Menu';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import packageJson from '../../../../package.json';
import DButton from '../../../components/DButton';
import Logo from '../assets/logo-full-light.svg';

const drawerWidth = 250;

interface Props {
    children: JSX.Element;
    handleSave: () => void;
    colorModeContext: any;
    themeMode: any;
}

export default function NavBar(props: Props) {
    const { children, handleSave, colorModeContext, themeMode } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();

    const colorMode: any = useContext(colorModeContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const sideBarContents = [
        {
            id: 'app',
            text: 'App',
            slug: '',
        },
        {
            id: 'auth0',
            text: 'Auth0',
            slug: 'auth0',
        },
        {
            id: 'categories',
            text: 'Categories',
            slug: 'categories',
        },
        {
            id: 'interface',
            text: 'Interface',
            slug: 'interface',
        },
        {
            id: 'providers',
            text: 'Providers',
            slug: 'providers',
        },
        {
            id: 'other',
            text: 'Other',
            slug: 'other',
        },
        {
            id: 'dev',
            text: 'Dev',
            slug: 'dev',
        },
    ];

    const drawer = (
        <Box sx={{ position: 'relative', height: '100%' }}>
            <Toolbar>
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <Box sx={{ width: '50%', margin: 'auto', marginTop: '10px' }}>
                        <img style={{ width: '100%' }} src={Logo} alt='' />
                    </Box>
                </Link>
            </Toolbar>
            <List>
                {sideBarContents.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Link
                            style={{ textDecoration: 'none', width: '100%', color: '#ffffff' }}
                            to={item.slug}
                        >
                            <ListItemButton
                                style={{
                                    margin: '5px 10px',
                                    padding: '5px 15px',
                                    borderRadius: theme.shape.borderRadius,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <ListItemIcon>
                                        {item.id === 'app' && <HomeRoundedIcon />}
                                        {item.id === 'auth0' && <LocalPoliceIcon />}
                                        {item.id === 'categories' && <CategoryRoundedIcon />}
                                        {item.id === 'interface' && <PaletteRoundedIcon />}
                                        {item.id === 'providers' && <StorageRoundedIcon />}
                                        {item.id === 'other' && <SettingsIcon />}
                                        {item.id === 'dev' && <CodeRoundedIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                    <ListItemIcon sx={{ minWidth: '0px' }}>
                                        <i className='ri-arrow-right-s-line'></i>
                                    </ListItemIcon>
                                </Box>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography variant='overline'>v{packageJson.version}</Typography>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundImage: 'none',
                    height: 'auto',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='body1' noWrap component='div'>
                        Dester Admin Panel
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            sx={{ marginRight: '10px' }}
                            onClick={colorMode.toggleColorMode}
                        >
                            {themeMode === 'dark' && <i className='ri-sun-fill'></i>}
                            {themeMode === 'light' && <i className='ri-sun-fill'></i>}
                        </IconButton>
                        <DButton variant='contained' onClick={handleSave}>
                            Save
                        </DButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label='mailbox folders'
            >
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .Dester-Drawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .Dester-Drawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
