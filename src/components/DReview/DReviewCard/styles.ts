import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const ListItemWrapper = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    marginBottom: '10px',
}));

export const AvatarContainer = styled(Box)<BoxProps>(() => ({
    width: 'fit-content',
    height: '100%',
    padding: '10px',
    textAlign: 'center',
    marginRight: '20px',
}));

export const AvatarWrapper = styled(Box)<BoxProps>(() => ({
    width: 'fit-content',
    height: '100%',
    marginBottom: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 0px 3px #FF3396',
    borderRadius: '50%',
    padding: '2px',
}));

export const MainContainer = styled(Box)<BoxProps>(() => ({
    padding: '20px',
    backgroundColor: alpha('#193F4F', 0.4),
    borderRadius: '15px',
}));

export const SubContainer = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
}));

export const FeaturedTitleWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: '#9133FF',
    padding: '5px 10px',
    width: 'fit-content',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 0px 0px 3px #AD66FF',
    display: 'flex',
    alignItems: 'center',
}));

export const ContentWrapper = styled(Box)<BoxProps>(() => ({
    overflow: 'hidden',
    maxHeight: '100px',
}));

export const DateWrapper = styled(Box)<BoxProps>(() => ({
    paddingTop: '10px',
    textAlign: 'end',
}));

export const AvatarTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.palette.primary.main
}));

export const AvatarImg = styled(Avatar)<AvatarProps>(() => ({
    width: '100px',
    height: '100px',
}));
