import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DButton from '../../../../components/DButton';

const ProvidersPage = (props: any) => {
    const { config, updateConfig } = props;
    const [refresh, setRefresh] = useState<number>(0);

    const providers = { 'Google Drive': 'gdrive', OneDrive: 'onedrive', SharePoint: 'sharepoint' };

    const handleChangeClientId = (event: any, key: string) => {
        const tempConfig = config;
        tempConfig[key].client_id = event.target.value;
        updateConfig(tempConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeClientSecret = (event: any, key: string) => {
        const tempConfig = config;
        tempConfig[key].client_secret = event.target.value;
        updateConfig(tempConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeAccessToken = (event: any, key: string) => {
        const tempConfig = config;
        tempConfig[key].access_token = event.target.value;
        updateConfig(tempConfig);
        setRefresh(refresh + 1);
    };

    const handleChangeRefreshToken = (event: any, key: string) => {
        const tempConfig = config;
        tempConfig[key].refresh_token = event.target.value;
        updateConfig(tempConfig);
        setRefresh(refresh + 1);
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '1000px', margin: 'auto auto', marginTop: '40px' }}>
            {Object.keys(providers).map((provider: string) => (
                <Accordion key={provider}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                    >
                        <Typography variant='body1'>{provider}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ marginBottom: '10px', marginTop: '-10px' }}>
                            <Link
                                style={{ textDecoration: 'none', width: '100%', color: '#ffffff' }}
                                to={providers[provider]}
                            >
                                <DButton fullWidth>Auto Generate {provider} Tokens</DButton>
                            </Link>
                        </Box>
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Client ID'
                            variant='outlined'
                            onChange={(e) => handleChangeClientId(e, providers[provider])}
                            value={config[providers[provider]].client_id || ''}
                        ></TextField>
                        {provider === 'Google Drive' && (
                            <TextField
                                fullWidth
                                required
                                sx={{ margin: '10px auto' }}
                                id='outlined-basic'
                                label='Client Secret'
                                variant='outlined'
                                onChange={(e) => handleChangeClientSecret(e, providers[provider])}
                                value={config[providers[provider]].client_secret || ''}
                            ></TextField>
                        )}
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Access Token'
                            variant='outlined'
                            onChange={(e) => handleChangeAccessToken(e, providers[provider])}
                            value={config[providers[provider]].access_token || ''}
                        ></TextField>
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Refresh Token'
                            variant='outlined'
                            onChange={(e) => handleChangeRefreshToken(e, providers[provider])}
                            value={config[providers[provider]].refresh_token || ''}
                        ></TextField>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default ProvidersPage;
