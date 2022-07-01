import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';

import DButton from '../../../components/DButton';

const PorvidersSlide = (props: any) => {
    const { config, updateConfig } = props;
    const providers = ['Google Drive', 'OneDrive', 'SharePoint'];

    return (
        <Box sx={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <Typography sx={{ marginBottom: '30px' }} variant='h5'>
                Credentials for Storage Providers
            </Typography>
            {providers.map((provider: string) => (
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
                            <DButton fullwidth>Auto Generate {provider} Tokens</DButton>
                        </Box>
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Client ID'
                            variant='outlined'
                        ></TextField>
                        {provider === 'gdrive' && (
                            <TextField
                                fullWidth
                                required
                                sx={{ margin: '10px auto' }}
                                id='outlined-basic'
                                label='Client Secret'
                                variant='outlined'
                            ></TextField>
                        )}
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Access Token'
                            variant='outlined'
                        ></TextField>
                        <TextField
                            fullWidth
                            required
                            sx={{ margin: '10px auto' }}
                            id='outlined-basic'
                            label='Refresh Token'
                            variant='outlined'
                        ></TextField>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default PorvidersSlide;
