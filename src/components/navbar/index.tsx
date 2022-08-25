import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    styled,
    useTheme,
} from '@mui/material';
import app from 'main/config';
import React from 'react';
import { Link } from 'react-router-dom';
import guid from 'utils/guid';

import Icon from 'components/icon';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    minHeight: '60px',
}));

const LogoWrapper = styled(Box)({
    width: 'fit-content',
    display: 'flex',
    flexGrow: 1,
});

const Logo = styled('img')({
    maxWidth: '120px',
    height: 'auto',
});

interface NavBarProps {
    logo: { light: string; dark: string };
}

const NavBar: React.FC<NavBarProps> = ({ logo }) => {
    const theme = useTheme();

    const CustomMenu = ({ item }: any) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <React.Fragment>
                <Button onClick={handleClick} sx={{ marginLeft: '10px' }} color='inherit'>
                    {item.label}
                </Button>
                {item.menu && (
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        elevation={0}
                        sx={{
                            '& .MuiPaper-root': {
                                border: '1px solid rgba(124, 124, 124, 0.1)',
                            },
                        }}
                    >
                        {item.menu.map((menuItem: any) => (
                            <MenuItem key={guid()} component={Link} to={menuItem.link}>
                                {menuItem.label}
                            </MenuItem>
                        ))}
                    </Menu>
                )}
            </React.Fragment>
        );
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position='static' elevation={0}>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <Icon name='menu' />
                    </IconButton>
                    <LogoWrapper>
                        <Logo
                            src={theme.palette.mode === 'light' && logo ? logo.light : logo.dark}
                            alt='dester'
                        />
                    </LogoWrapper>
                    <Box>
                        {app.navbar.main.items.map((item) => (
                            <CustomMenu key={guid()} item={item} />
                        ))}
                    </Box>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
};

export default NavBar;
