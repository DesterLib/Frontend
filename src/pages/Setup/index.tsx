import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

import DButton from '../../components/DButton';
import { APP_API_PATH, APP_API_VERSION_PATH } from '../../config';
import AdditionalSlide from './Slides/additional';
import MainSlide from './Slides/main';
import ProvidersSlide from './Slides/providers';
import StorageSlide from './Slides/storage';
import UISlide from './Slides/ui';

const steps = ['App', 'Storage', 'Providers', 'Interface', 'Additional'];

const SetupPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 2 || step === 3;
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
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [config, setConfig] = useState<any>({});
    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}/settings`);
            const data = (await res.json()) || {};
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
            setIsLoaded(true);
        };
        getData();
    }, []);

    const setApp = (appConfig: any) => {
        var newConfig = config;
        newConfig['app'] = appConfig;
        setConfig(newConfig);
    };

    const setAuth0 = (auth0Config: any) => {
        var newConfig = config;
        newConfig['auth0'] = auth0Config;
        setConfig(newConfig);
    };

    const setCategories = (categoriesConfig: any) => {
        var newConfig = config;
        newConfig['categories'] = categoriesConfig;
        setConfig(newConfig);
    };

    const setUi = (uiConfig: any) => {
        var newConfig = config;
        newConfig['ui'] = uiConfig;
        setConfig(newConfig);
    };

    const setGdrive = (gdriveConfig: any) => {
        var newConfig = config;
        newConfig['gdrive'] = gdriveConfig;
        setConfig(newConfig);
    };

    const setOnedrive = (onedriveConfig: any) => {
        var newConfig = config;
        newConfig['onedrive'] = onedriveConfig;
        setConfig(newConfig);
    };

    const setSharepoint = (sharepointConfig: any) => {
        var newConfig = config;
        newConfig['sharepoint'] = sharepointConfig;
        setConfig(newConfig);
    };

    const setTmdb = (tmdbConfig: any) => {
        var newConfig = config;
        newConfig['tmdb'] = tmdbConfig;
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
                <DButton onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </DButton>
            </Box>
        );
    };

    return (
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
                {activeStep === 0 && <MainSlide />}
                {activeStep === 2 && (
                    <StorageSlide config={config.categories} updateConfig={setCategories} />
                )}
                {activeStep === 1 && (
                    <ProvidersSlide config={config.gdrive} updateConfig={setGdrive} />
                )}
                {activeStep === 3 && <UISlide />}
                {activeStep === 4 && <AdditionalSlide />}
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
                    <i className='ri-attachment-line' style={{ marginRight: '8px' }}></i><Typography variant='body1'>Docs</Typography>
                </a>
                {activeStep !== steps.length && <Navigation />}
            </Paper>
        </Box>
    );
};

export default SetupPage;
