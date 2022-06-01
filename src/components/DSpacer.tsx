import { styled } from '@mui/material/styles';

const DSpacer = styled('div')(({ theme }) => ({
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    height: '5px',
    width: '5px',
    margin: '8px'
}));

export default DSpacer;