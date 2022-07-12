import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const ListItemWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    marginBottom: '10px',
    padding: '5px',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('md')]: {
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
    },
}));

export const AvatarContainer = styled(Box)<BoxProps>(({ theme }) => ({
    width: 'fit-content',
    height: '100%',
    padding: '10px',
    textAlign: 'center',
    marginRight: '20px',
    [theme.breakpoints.down('md')]: {
        marginRight: '10px',
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: '0px',
    },
}));

export const AvatarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    width: 'fit-content',
    height: '100%',
    marginBottom: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 0px 3px #FF3396',
    borderRadius: '50%',
    padding: '2px',
    [theme.breakpoints.down('sm')]: {
        boxShadow: '0px 0px 0px 2px #FF3396',
    },
}));

export const MainContainer = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
        padding: '10px 20px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '10px 10px',
    },
}));

export const SubContainer = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
}));

export const FeaturedTitleWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: '5px 10px',
    width: 'fit-content',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        padding: '0px 5px',
    },
}));

export const ContentWrapper = styled(Box)<BoxProps>(() => ({
    overflow: 'hidden',
    maxHeight: 'auto',
    wordBreak: 'break-all',
    paddingRight: '20px',
}));

export const DateWrapper = styled(Box)<BoxProps>(() => ({
    paddingTop: '20px',
    textAlign: 'left',
}));

export const AvatarTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: `${theme.palette.mode === 'light' ? '#000000' : theme.palette.primary.main}`,
}));

export const AvatarImg = styled(Avatar)<AvatarProps>(({ theme }) => ({
    width: '100px',
    height: '100px',
    [theme.breakpoints.down('md')]: {
        width: '80px',
        height: '80px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '50px',
        height: '50px',
    },
}));
