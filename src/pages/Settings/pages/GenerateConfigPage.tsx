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

const GenerateConfigPage = () => {
    const [config, setConfig] = React.useState({});
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
        const app_name = localStorage.getItem('app_name') || 'DesterLib';
        const app_title =
            localStorage.getItem('app_title') || 'DesterLib - A Powerful Media Interface';
        const app_description =
            localStorage.getItem('app_description') ||
            'DesterLib is a powerful and lightweight media solution to interface your movie and TV libraries in a goddamn gorgeous way';
        const app_domain = localStorage.getItem('app_domain') || '';
        const gdrive_clientId = localStorage.getItem('gdrive_clientId') || '';
        const gdrive_clientSecret = localStorage.getItem('gdrive_clientSecret') || '';
        const gdrive_refreshToken = localStorage.getItem('gdrive_refreshToken') || '';
        const gdrive_accessToken = localStorage.getItem('gdrive_accessToken') || '';

        var error = '';

        if (!gdrive_clientId || !gdrive_clientSecret || !gdrive_refreshToken) {
            error += 'Warning! The Google Drive section was not configured correctly!\n';
        }

        var tempCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        if (tempCategories.length == 0) {
            error += 'Warning! No categories were found! Go back to create some.\n';
        } else {
            for (let i = 0; i < tempCategories.length; i++) {
                tempCategories[i]['type'] = tempCategories[i].type || 'movie';
                tempCategories[i]['language'] = tempCategories[i].language || 'en';
                tempCategories[i]['name'] = tempCategories[i].name || 'undefined';
                tempCategories[i]['adult'] = tempCategories[i].anime || false;
                tempCategories[i]['anime'] = tempCategories[i].anime || false;
                if (!tempCategories[i].id) {
                    tempCategories[i]['id'] = null;
                    error += `Warning! No Google Drive folder ID was provided for category ${i.toString()}\n`;
                }
            }
        }
        const categories = tempCategories;
        displayError(error);

        setConfig({
            app: {
                name: app_name,
                title: app_title,
                description: app_description,
                domain: app_domain,
            },
            categories: categories,
            ui: {
                palatte: {
                    primary: {
                        main: '',
                        light: '',
                        dark: '',
                    },
                    secondary: {
                        main: '',
                        light: '',
                        dark: '',
                    },
                },
            },
            gdrive: {
                client_id: gdrive_clientId,
                client_secret: gdrive_clientSecret,
                refresh_token: gdrive_refreshToken,
                access_token: gdrive_accessToken,
            },
        });
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
