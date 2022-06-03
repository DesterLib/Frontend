import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';

const OtherPage = (props: any) => {
    const [refresh, setRefresh] = useState<number>(0);

    const { tmdb, build, updateTmdb, updateBuild } = props;

    const handleChangeTmdbKey = (event: any) => {
        var newTmdb = tmdb;
        newTmdb['api_key'] = event.target.value;
        updateTmdb(newTmdb);
        setRefresh(refresh + 1);
    };

    const handleChangeBuildCron = (event: any) => {
        var newBuild = build;
        newBuild['cron'] = event.target.value;
        updateBuild(newBuild);
        setRefresh(refresh + 1);
    };

    const textFiledStyles = {
        marginBottom: '20px',
    };

    return (
        <Box>
            <TextField
                sx={textFiledStyles}
                helperText='Enter the API key for your TMDB account'
                fullWidth
                label='TMDB API Key'
                variant='outlined'
                onChange={handleChangeTmdbKey}
                value={tmdb.api_key}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the cron formatted build time/interval for metadata generation'
                fullWidth
                label='Build Cron'
                variant='outlined'
                onChange={handleChangeBuildCron}
                value={build.cron}
            />
        </Box>
    );
};

export default OtherPage;
