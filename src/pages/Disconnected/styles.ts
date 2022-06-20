import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)<BoxProps>(() => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
}));

export const ImageWrapper = styled(Box)<BoxProps>(() => ({
    padding: '20px',
}));

export const Image = styled('img')(() => ({
    width: '100%',
    maxWidth: '150px',
}));

export const DetailsContainer = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: '#174453',
    borderRadius: theme.shape.borderRadius,
    padding: '15px 20px',
    maxWidth: '500px',
    width: '100%',
}));

export const NavigationContainer = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '5px',
}));

export const ErrorText = styled(Typography)<TypographyProps>(() => ({
    textAlign: 'center',
    background: '-webkit-linear-gradient(#14dca0, #03d7fc)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    paddingBottom: '10px',
}));
