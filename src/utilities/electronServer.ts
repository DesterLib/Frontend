import { useTheme } from '@mui/material';
import Swal from 'sweetalert2';

import { APP_API_PATH } from '../config';
import isElectron from './isElectron';

const electronServer = async () => {
    if (isElectron() && !APP_API_PATH) {
        const theme = useTheme();
        const { value: serverUrl } = await Swal.fire({
            title: 'Server URL',
            input: 'text',
            inputLabel: 'Your server URL. For example, https://dester.gq',
            inputValue: '',
            confirmButtonColor: theme.palette.primary.dark,
        });
        if (serverUrl) {
            localStorage.setItem('SERVER_URL', serverUrl);
            window.location.reload();
        }
    }
};

export default electronServer;
