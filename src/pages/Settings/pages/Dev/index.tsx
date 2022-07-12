import ConstructionIcon from '@mui/icons-material/Construction';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';

import DButton from '../../../../components/DButton';
import { APP_API_PATH, APP_API_VERSION_PATH } from '../../../../config';

const DevPage = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [data, setData] = useState<string>('');

    useEffect(() => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${APP_API_PATH}/api/v1/logs/live`);
        xhr.send();
        const getData = async () => {
            setData(xhr.responseText);
        };

        setInterval(() => {
            getData();
        }, 1000);
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
                    <p dangerouslySetInnerHTML={{ __html: data }} />
                </Box>
            </Paper>
            <DButton
                sx={{ marginBottom: '60px' }}
                color='warning'
                startIcon={<ConstructionIcon />}
                onClick={handleRebuild}
            >
                Rebuild Metadata
            </DButton>
        </Box>
    );
};

export default DevPage;
