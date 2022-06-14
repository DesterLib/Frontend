import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Box, { BoxProps } from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const Container = styled(Box)<BoxProps>(() => ({
    maxWidth: '220px',
    padding: '10px',
}));

export const PersonAvatarWrapper = styled(Box)<BoxProps>(() => ({
    aspectRatio: '1/1',
    boxShadow: '0px 0px 0px 3px rgba(0,255,179,1)',
    borderRadius: '50%',
    margin: '0 auto 15px auto',
    padding: '3px',
}));

export const PersonAvatarImg = styled(Avatar)<AvatarProps>(() => ({
    height: '100%',
    width: '100%',
}));

export const InfoWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: '5px 10px',
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
    borderRadius: theme.shape.borderRadius,
    border: `2px solid ${alpha(theme.palette.background.paper, 0.3)}`,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

export const StyledAvatar = styled(Avatar)<AvatarProps>(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const VoiceInfoTag = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    padding: '0px 5px',
    borderRadius: '10px 0px 0px 0px',
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
}));
