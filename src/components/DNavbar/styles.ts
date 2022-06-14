import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const LogoImage = styled('img')(() => ({
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

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.default, 0.9),
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
    backdropFilter: 'blur(10px)',
    width: 'calc(100% - 20px)',
    marginTop: '10px',
    left: '0',
    right: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
        marginTop: '0px',
        width: '100%',
        borderRadius: '0px',
    },
}));

export const LeftMenuToggle = styled(IconButton)(({ theme }) => ({
    padding: '10px',
    fontSize: '24px',
    height: '45px',
    width: '45px',
    marginLeft: '0px',
    marginRight: '10px',
}));

export const LogoWrapper = styled(Box)(({ theme }) => ({
    margin: '0px',
    fontSize: '0px',
    position: 'relative',
    width: '200px',
    height: '60px',
    minWidth: '160px',
    minHeight: '60px',
}));

export const AvatarButtonWrapper = styled(Box)(({ theme }) => ({
    padding: '0px'
}));