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
import SearchButton from 'components/searchbutton';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    height: '60px',
}));

const LogoWrapper = styled(Box)({
    width: 'fit-content',
    display: 'flex',
});

const Logo = styled('img')({
    maxWidth: '120px',
    height: 'auto',
});

interface NavBarProps {
    logo: { light: string; dark: string };
    handleOpenSideBar: any;
}

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

const NavBar = React.forwardRef((props: NavBarProps, ref: any) => {
    const theme = useTheme();
    const { logo, handleOpenSideBar } = props;
    return (
        <Box ref={ref}>
            <StyledAppBar position='static' elevation={0}>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{
                            mr: 2,
                            [theme.breakpoints.down('md')]: {
                                display: 'none',
                            },
                        }}
                        onClick={handleOpenSideBar}
                    >
                        <Icon name='menu' />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <LogoWrapper>
                            <Logo
                                src={
                                    theme.palette.mode === 'light' && logo ? logo.light : logo.dark
                                }
                                alt='dester'
                            />
                        </LogoWrapper>
                        <SearchButton />
                        <Box sx={{ display: 'flex' }}>
                            {app.navbar.main.items.map((item) => (
                                <CustomMenu key={guid()} item={item} />
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
});

export default NavBar;
