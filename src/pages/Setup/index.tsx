import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DButton from '../../components/DButton';
import DLoader from '../../components/DLoader';
import { APP_API_PATH, APP_API_VERSION_PATH } from '../../config';
import AppPage from '../Settings/pages/App';
import CategoriesPage from '../Settings/pages/Categories';
import InterfacePage from '../Settings/pages/Interface';
import OtherPage from '../Settings/pages/Other';
import ProvidersPage from '../Settings/pages/Providers';
import GDriveTokenGenerator from '../Settings/pages/Providers/GDriveTokenGeneratorPage';
import OneDriveTokenGenerator from '../Settings/pages/Providers/OneDriveTokenGeneratorPage';

const steps = ['App', 'Providers', 'Storage', 'Other', 'Interface'];

const SetupPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [activeProvider, setActiveProvider] = React.useState<string>('');
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const [searchParams] = useSearchParams();
    const state = searchParams.get('state');

    const isStepOptional = (step: number) => {
        return step === 1 || step === 4;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeProvider) {
            setActiveProvider('');
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // prettier-ignore
            throw new Error('You can\'t skip a step that isn\'t optional.');
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const theme = useTheme();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [config, setConfig] = useState<any>({});
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`);
            const data = (await res.json()) || {};
            if (data.code === 401) {
                navigate('/');
            }
            var tempConfig = data.result || {};
            if (!tempConfig.app) {
                tempConfig['app'] = {};
            }
            if (!tempConfig.auth0) {
                tempConfig['auth0'] = {};
            }
            if (!tempConfig.categories) {
                tempConfig['categories'] = [];
            }
            if (!tempConfig.gdrive) {
                tempConfig['gdrive'] = {};
            }
            if (!tempConfig.onedrive) {
                tempConfig['onedrive'] = {};
            }
            if (!tempConfig.sharepoint) {
                tempConfig['sharepoint'] = {};
            }
            if (!tempConfig.tmdb) {
                tempConfig['tmdb'] = {};
            }
            if (!tempConfig.build) {
                tempConfig['build'] = {};
            }
            if (!tempConfig.rclone) {
                tempConfig['rclone'] = {};
            }
            setConfig(tempConfig);
            if (state) {
                setActiveStep(1);
            }
            setIsLoaded(true);
        };
        getData();
    }, []);

    const setApp = (appConfig: any) => {
        var newConfig = config;
        newConfig['app'] = appConfig;
        setConfig(newConfig);
    };

    const setCategories = (categoriesConfig: any) => {
        var newConfig = config;
        newConfig['categories'] = categoriesConfig;
        setConfig(newConfig);
    };

    const setInterface = (uiConfig: any) => {
        var newConfig = config;
        newConfig['ui'] = uiConfig;
        setConfig(newConfig);
    };

    const setTmdb = (tmdbConfig: any) => {
        var newConfig = config;
        newConfig['tmdb'] = tmdbConfig;
        setConfig(newConfig);
    };

    const setSubtitles = (subtitlesConfig: any) => {
        var newConfig = config;
        newConfig['subtitles'] = subtitlesConfig;
        setConfig(newConfig);
    };

    const setBuild = (buildConfig: any) => {
        var newConfig = config;
        newConfig['build'] = buildConfig;
        setConfig(newConfig);
    };

    const handleSave = () => {
        fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config),
        });
        setRefresh(refresh + 1);
    };

    const Navigation = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {(activeStep > 0 || activeStep !== 0) && (
                    <DButton color='secondary' onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                    </DButton>
                )}
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                    <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                    </Button>
                )}
                {activeStep === steps.length - 1 ? (
                    <DButton onClick={handleSave}>Finish</DButton>
                ) : (
                    <DButton onClick={handleNext}>Next</DButton>
                )}
            </Box>
        );
    };

    return isLoaded ? (
        <Box
            sx={{
                marginTop: '50px',
                width: 'calc(100% - 100px)',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '20px',
            }}
        >
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant='caption'>Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Box>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </Box>
            )}
            <Paper
                sx={{
                    margin: '20px auto',
                    width: 'fit-content',
                    padding: '20px',
                    background: `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                {activeStep === 0 && <AppPage config={config.app} updateConfig={setApp} />}
                {activeStep === 1 ? (
                    activeProvider === 'gdrive' ? (
                        <GDriveTokenGenerator config={config} />
                    ) : activeProvider === 'onedrive' ? (
                        <OneDriveTokenGenerator config={config} />
                    ) : (
                        <ProvidersPage
                            config={config}
                            updateConfig={setConfig}
                            onNavigate={setActiveProvider}
                        />
                    )
                ) : null}
                {activeStep === 2 && (
                    <CategoriesPage config={config.categories} updateConfig={setCategories} />
                )}
                {activeStep === 3 && (
                    <OtherPage
                        tmdb={config.tmdb}
                        subtitles={config.subtitles}
                        build={config.build}
                        updateTmdb={setTmdb}
                        updateSubtitles={setSubtitles}
                        updateBuild={setBuild}
                    />
                )}
                {activeStep === 4 && (
                    <InterfacePage conifg={config.ui} updateConfig={setInterface} />
                )}
                <a
                    style={{
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        marginRight: '10px',
                    }}
                    target='_blank'
                    href='https://dester.gq'
                    rel='noreferrer'
                >
                    <i className='ri-attachment-line' style={{ marginRight: '8px' }}></i>
                    <Typography variant='body1'>Docs</Typography>
                </a>
                {activeStep !== steps.length && <Navigation />}
            </Paper>
        </Box>
    ) : (
        <DLoader />
    );
};

export default SetupPage;
