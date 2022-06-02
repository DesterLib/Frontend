import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    Paper,
    Snackbar,
    Switch,
} from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect } from 'react';

const GenerateConfigPage = (data: any) => {
    var tempConfig = data.data || {};

    const [config, setConfig] = React.useState(tempConfig);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string[]>([]);
    const [isOneLine, setIsOneLine] = React.useState<boolean>(false);

    useEffect(() => {
        createConfig();
    }, []);

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleSwitchOneLine = () => {
        setIsOneLine(!isOneLine);
    };

    const handleCopyConfig = () => {
        if (isOneLine) {
            navigator.clipboard.writeText(JSON.stringify(config));
        } else {
            navigator.clipboard.writeText(JSON.stringify(config, undefined, 4));
        }
    };

    function syntaxHighlight(json: any) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(
            // eslint-disable-next-line no-useless-escape
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match: any) {
                var cls = 'json-number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key';
                    } else {
                        cls = 'json-string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean';
                } else if (/null/.test(match)) {
                    cls = 'json-null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            },
        );
    }

    const displayError = (message: string) => {
        console.error(message);
        var errorArray: string[] = message.split('\n');
        if (errorArray.length) {
            errorArray.pop();
            setErrorMessage(errorArray);
            setOpenSnackBar(true);
        }
    };

    const createConfig = () => {
        var error = '';
        var tempConfig = config;

        if (!config.app) {
            tempConfig['app'] = {};
            error += 'Warning! The home section was not configured!\n';
        }
        if (!config.categories) {
            tempConfig['app'] = [];
            error += 'Warning! The categories section was not configured!\n';
        } else if (!config.categories.length) {
            error += 'Warning! No category were added in the categories section!\n';
        }
        if (!config.gdrive) {
            tempConfig['gdrive'] = {};
            error += 'Warning! The Google Drive section was not configured!\n';
        } else if (
            !config.gdrive.client_id ||
            !config.gdrive.client_secret ||
            !config.gdrive.refresh_token
        ) {
            error += 'Warning! One or more vairables are missing in the Google Drive Section!\n';
        }
        displayError(error);

        setConfig(tempConfig);
    };
    const handleDownloadConfig = () => {
        const element = document.createElement('a');
        var file;
        if (isOneLine) {
            file = new Blob([JSON.stringify(config)], {
                type: 'application/json',
            });
        } else {
            file = new Blob([JSON.stringify(config, undefined, 4)], { type: 'application/json' });
        }
        element.href = URL.createObjectURL(file);
        element.download = 'config.json';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Paper sx={{ padding: '10px' }}>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={9000}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{ marginTop: '70px', marginRight: '6px' }}
            >
                <div>
                    {errorMessage.map((error: string, n: number) => {
                        return (
                            <Alert
                                key={n}
                                onClose={handleCloseSnackBar}
                                severity='error'
                                style={{ marginBottom: '10px' }}
                                sx={{ width: '100%' }}
                            >
                                {error}
                            </Alert>
                        );
                    })}
                </div>
            </Snackbar>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={handleDownloadConfig}
                    startIcon={<DownloadRoundedIcon />}
                    variant='contained'
                >
                    Download JSON File
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    color='primary'
                                    onChange={handleSwitchOneLine}
                                    checked={isOneLine}
                                />
                            }
                            label={
                                <Button variant='text' onClick={handleSwitchOneLine}>
                                    One Line
                                </Button>
                            }
                        />
                    </FormGroup>
                    <Button
                        startIcon={<ContentCopyRoundedIcon />}
                        variant='text'
                        onClick={handleCopyConfig}
                    >
                        Copy
                    </Button>
                </Box>
            </Box>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
                {parse(syntaxHighlight(JSON.stringify(config, undefined, 4)))}
            </pre>
        </Paper>
    );
};

export default GenerateConfigPage;
