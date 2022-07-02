import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DButton from '../../../../components/DButton';
import { GDriveToken, OneDriveToken } from '../../utilities/tokens';

const ProvidersPage = (props: any) => {
    const { config, updateConfig, onNavigate } = props;

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const tempAuthCode = searchParams.get('code') || '';
    const state = searchParams.get('state');

    const [authCode] = useState<string>(tempAuthCode);
    const [refresh, setRefresh] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const providers = { 'Google Drive': 'gdrive', OneDrive: 'onedrive', SharePoint: 'sharepoint' };
    const [expandAccordian, setExpandAccordian] = useState<any>({
        gdrive: false,
        onedrive: false,
        sharepoint: false,
    });

    useEffect(() => {
        if (state) {
            const stateConfig = JSON.parse(state) || {};
            const newConfig = JSON.parse(sessionStorage.getItem(stateConfig.uid) || config);
            updateConfig(newConfig);
            setIsLoaded(true);
        } else {
            setIsLoaded(true);
        }
        if (authCode && isLoaded && state) {
            const stateConfig = JSON.parse(state) || {};
            if (stateConfig.provider === 'gdrive') {
                GDriveToken(
                    handleChangeAccessToken,
                    handleChangeRefreshToken,
                    config.gdrive.client_id,
                    config.gdrive.client_secret,
                    authCode,
                );
                const tempExpandAccordian = expandAccordian;
                tempExpandAccordian.gdrive = true;
                setExpandAccordian(tempExpandAccordian);
            } else if (stateConfig.provider === 'onedrive') {
                OneDriveToken(
                    handleChangeAccessToken,
                    handleChangeRefreshToken,
                    config.onedrive.client_id,
                    authCode,
                );
                const tempExpandAccordian = expandAccordian;
                tempExpandAccordian.onedrive = true;
                setExpandAccordian(tempExpandAccordian);
            }
            navigate('', { replace: true });
        }
    }, [state, isLoaded]);

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

    const handleClickAccordian = (provider: string) => {
        const tempExpandAccordian = expandAccordian;
        tempExpandAccordian[provider] = !expandAccordian[provider];
        setExpandAccordian(tempExpandAccordian);
        setRefresh(refresh + 1);
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '1000px', margin: 'auto auto', marginTop: '40px' }}>
            {Object.keys(providers).map((provider: string) => (
                <Accordion
                    key={provider}
                    expanded={expandAccordian[providers[provider]]}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onChange={(e: any) => handleClickAccordian(providers[provider])}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                    >
                        <Typography variant='body1'>{provider}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ marginBottom: '10px', marginTop: '-10px' }}>
                            <DButton
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                onClick={(e) =>
                                    onNavigate
                                        ? onNavigate(providers[provider])
                                        : navigate(providers[provider])
                                }
                                fullWidth
                            >
                                Auto Generate {provider} Tokens
                            </DButton>
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
