import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import GoogleIcon from '@mui/icons-material/Google';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo-full-light.svg';
import OneDriveIcon from '../assets/onedrive.png';
import SharePointIcon from '../assets/sharepoint.png';

const drawerWidth = 240;

interface Props {
    children: JSX.Element;
    handleSave: () => void;
}

export default function NavBar(props: Props) {
    const { children, handleSave } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClearLocalStorage = () => {
        localStorage.clear();
        window !== undefined && window.location.reload();
    };

    const sideBarContents = [
        {
            id: 'home',
            text: 'Home',
            slug: '',
        },
        {
            id: 'categories',
            text: 'Categories',
            slug: 'categories',
        },
        {
            id: 'ui',
            text: 'Interface',
            slug: 'ui',
        },
        {
            id: 'gdrive',
            text: 'Google Drive',
            slug: 'gdrive',
        },
        {
            id: 'onedrive',
            text: 'OneDrive',
            slug: 'onedrive',
        },
        {
            id: 'sharepoint',
            text: 'SharePoint',
            slug: 'sharepoint',
        },
        {
            id: 'other',
            text: 'Other',
            slug: 'other',
        },
        {
            id: 'generateConfig',
            text: 'Generate Config',
            slug: 'config',
        },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <img style={{ margin: 'auto' }} width='80%' src={Logo} alt='' />
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
                                sx={{
                                    margin: '5px 10px',
                                    padding: '5px 15px',
                                    borderRadius: '10px',
                                }}
                            >
                                <ListItemIcon>
                                    {item.id === 'home' && <HomeRoundedIcon />}
                                    {item.id === 'categories' && <CategoryRoundedIcon />}
                                    {item.id === 'ui' && <PaletteRoundedIcon />}
                                    {item.id === 'gdrive' && <GoogleIcon />}
                                    {item.id === 'onedrive' && <img src={OneDriveIcon} />}
                                    {item.id === 'sharepoint' && <img src={SharePointIcon} />}
                                    {item.id === 'other' && <SettingsIcon />}
                                    {item.id === 'generateConfig' && <CodeRoundedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Button onClick={handleSave}>Save</Button>
        </div>
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
                    height: '70px',
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
                    <Typography variant='h6' noWrap component='div'>
                        Dester Admin Panel
                    </Typography>
                    <Button onClick={handleClearLocalStorage} color='warning' variant='outlined'>
                        Reset
                    </Button>
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
