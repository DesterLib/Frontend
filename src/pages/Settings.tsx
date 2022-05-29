import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

import { APP_API_PATH } from '../config';

const Settings = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}/api/v1/settings`);
            const data = (await res.json()) || null;
            setData(data || { ok: false });
            setIsLoaded(true);
        };
        getData();
    }, []);

    console.log(data);

    return isLoaded ? (
        <Box></Box>
    ) : (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Settings;
