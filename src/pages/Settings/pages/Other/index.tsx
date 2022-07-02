import {
    Box,
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

const OtherPage = (props: any) => {
    const [refresh, setRefresh] = useState<number>(0);

    const { tmdb, subtitles, build, updateTmdb, updateSubtitles, updateBuild } = props;

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

    const handleChangeOpenSubtitlesKey = (event: any) => {
        var newSubtitles = subtitles;
        newSubtitles['api_key'] = event.target.value;
        updateSubtitles(newSubtitles);
        setRefresh(refresh + 1);
    };

    const handleChangeLocalSubtitles = () => {
        var newSubtitles = subtitles;
        newSubtitles['local'] = !newSubtitles.local;
        updateSubtitles(newSubtitles);
        setRefresh(refresh + 1);
    };

    const textFiledStyles = {
        marginBottom: '20px',
    };

    const theme = useTheme();

    const boxContainer = {
        padding: '20px',
        borderRadius: theme.shape.borderRadius,
        maxWidth: '1000px',
        margin: 'auto auto',
        marginTop: '40px',
    };

    return (
        <Box sx={boxContainer}>
            <TextField
                sx={textFiledStyles}
                helperText='Enter the API key from your TMDB account'
                fullWidth
                label='TMDB API Key'
                variant='outlined'
                onChange={handleChangeTmdbKey}
                value={tmdb.api_key || ''}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the cron formatted build time/interval for metadata generation'
                fullWidth
                label='Build Cron'
                variant='outlined'
                onChange={handleChangeBuildCron}
                value={build.cron || ''}
            />
            <TextField
                sx={textFiledStyles}
                helperText='Enter the API key from your OpenSubtitles account'
                fullWidth
                label='OpenSubtitles API Key'
                variant='outlined'
                onChange={handleChangeOpenSubtitlesKey}
                value={subtitles.api_key || ''}
            />
            <FormControl component='fieldset'>
                <FormGroup aria-label='position' row>
                    <FormControlLabel
                        control={
                            <Switch
                                color='primary'
                                checked={subtitles.local || false}
                                onChange={handleChangeLocalSubtitles}
                            />
                        }
                        label='Local Subtitles'
                        labelPlacement='start'
                    />
                </FormGroup>
            </FormControl>
        </Box>
    );
};

export default OtherPage;
