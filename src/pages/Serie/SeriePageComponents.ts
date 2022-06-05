import { styled } from '@mui/material/styles';

export const MainWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'url',
})<{ url?: string }>(({ url }) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    position: 'absolute',
    opacity: '0.7',
    width: '100%',
    aspectRatio: '21/9',
    zIndex: '0',
}));

export const StackItemOne = styled('div')(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
}));

export const StackItemTwo = styled('div')(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
}));
