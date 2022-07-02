import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '.Dester-InputBase-root': {
        color: theme.palette.text.primary,
        border: '0px',
        borderRadius: theme.shape.borderRadius,
        transition: '0.2s ease-out',
        backgroundColor: alpha(theme.palette.background.default, 0.7),
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
    },
    '.Dester-InputBase-root:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 1),
        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.background.paper, 0.5)}`,
    },
    '.Dester-OutlinedInput-notchedOutline': {
        border: '0px',
    },
    '.Dester-InputLabel-root.Mui-focused': {
        display: 'none',
    },
}));
