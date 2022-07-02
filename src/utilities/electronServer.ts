import { useTheme } from '@mui/material';
import Swal from 'sweetalert2';

import { APP_API_PATH, APP_IS_ELECTRON, APP_IS_SEPERATE } from '../config';

const electronServer = async () => {
    if ((APP_IS_ELECTRON || APP_IS_SEPERATE) && !APP_API_PATH) {
        const theme = useTheme();
        const { value: serverUrl } = await Swal.fire({
            title: 'Server URL',
            input: 'text',
            inputLabel: 'Your server URL. For example, https://dester.gq',
            inputValue: '',
            confirmButtonColor: theme.palette.primary.dark,
        });
        if (serverUrl && serverUrl.startsWith('http')) {
            localStorage.setItem('SERVER_URL', serverUrl.replace(/\/+$/g, ''));
            window.location.reload();
        } else {
            window.location.reload();
        }
    }
};

export default electronServer;
