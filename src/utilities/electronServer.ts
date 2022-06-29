import { useTheme } from '@mui/material';
import Swal from 'sweetalert2';

import { APP_API_PATH, APP_IS_ELECTRON } from '../config';

const electronServer = async () => {
    if (APP_IS_ELECTRON && !APP_API_PATH) {
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
