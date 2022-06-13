import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
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
    width: '100%',
    height: '100%',
    marginBottom: '10px',
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
}));

export const FeaturedDeatilsWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: '#FF3396',
    padding: '2px 5px',
    width: 'fit-content',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 0px 0px 3px #FF66B0',
}));

export const ContentWrapper = styled(Box)<BoxProps>(() => ({
    overflow: 'hidden',
    maxHeight: '100px',
}));

export const DateWrapper = styled(Box)<BoxProps>(() => ({
    paddingTop: '10px',
    textAlign: 'end',
}));

export const AvatarImg = styled(Avatar)<AvatarProps>(() => ({
    height: '100px',
    width: '100px',
}));
