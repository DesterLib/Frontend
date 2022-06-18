import ConstructionIcon from '@mui/icons-material/Construction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';

import DButton from '../../../components/DButton';
import { APP_API_PATH, APP_API_VERSION_PATH } from '../../../config';

const DevPage = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [data, setData] = useState<any>('');

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}/api/v1/logs`);
            const data = (await res.json()) || { ok: false };
            setData(data.result);
            setIsLoaded(true);
        };
        getData();
        const interval = setInterval(() => getData(), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleRebuild = () => {
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/rebuild`);
        setRefresh(refresh + 1);
    };
    return (
        <Box>
            <Paper sx={{ padding: '5px', height: '600px', marginBottom: '20px' }}>
                <Box
                    sx={{
                        padding: '5px 20px',
                        height: '100%',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                    }}
                >
                    <p style={{ whiteSpace: 'pre-line' }}>{data}</p>
                </Box>
            </Paper>
            <DButton color='warning' startIcon={<ConstructionIcon />} onClick={handleRebuild}>
                Rebuild Metadata
            </DButton>
        </Box>
    );
};

export default DevPage;
