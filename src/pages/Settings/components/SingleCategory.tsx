import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const SingleCategory = (props: any) => {
    const [isAdult, setIsAdult] = React.useState(false);
    const [isAnime, setIsAnime] = React.useState(false);
    const [categoryType, setCategoryType] = React.useState('');
    const [categoryProvider, setCategoryProvider] = React.useState('');
    const [categoryLanguage, setCategoryLanguage] = React.useState('');
    const [categoryName, setCategoryName] = React.useState('');
    const [categoryId, setCategoryId] = React.useState('');
    const [categoryDriveId, setCategoryDriveId] = React.useState('');
    const [isInitial, setIsInitial] = React.useState(true);

    const handleChangeCategoryAdult = (event: any) => {
        var adult;
        if (typeof event == 'boolean') {
            adult = event;
        } else {
            adult = !isAdult;
        }
        setIsAdult(adult);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['adult'] = adult;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryAnime = (event: any) => {
        var anime;
        if (typeof event == 'boolean') {
            anime = event;
        } else {
            anime = !isAnime;
        }
        setIsAnime(anime);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['anime'] = anime;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryType = (event: any) => {
        setCategoryType(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['type'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryLanguage = (event: any) => {
        setCategoryLanguage(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['language'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryProvider = (event: any) => {
        setCategoryProvider(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['provider'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryName = (event: any) => {
        setCategoryName(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['name'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryId = (event: any) => {
        setCategoryId(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['id'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const handleChangeCategoryDriveId = (event: any) => {
        setCategoryDriveId(event.target.value);
        var importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories[props.index]['drive_id'] = event.target.value;
        localStorage.setItem('categories', JSON.stringify(importedCategories));
    };

    const textFieldStyles = {
        marginBottom: '20px',
    };

    if (isInitial && props.item) {
        if (typeof props.item.adult == 'boolean') {
            handleChangeCategoryAdult(props.item.adult);
        }
        if (typeof props.item.anime == 'boolean') {
            handleChangeCategoryAnime(props.item.anime);
        }
        if (['movie', 'serie', 'music'].includes(props.item.type)) {
            handleChangeCategoryType({ target: { value: props.item.type } });
        }
        if (['en', 'hi', 'ja'].includes(props.item.language)) {
            handleChangeCategoryLanguage({ target: { value: props.item.language } });
        }
        if (['googledrive', 'onedrive', 'sharepoint'].includes(props.item.provider)) {
            handleChangeCategoryProvider({ target: { value: props.item.provider } });
        }
        if (typeof props.item.name == 'string') {
            handleChangeCategoryName({ target: { value: props.item.name } });
        }
        if (typeof props.item.id == 'string') {
            handleChangeCategoryId({ target: { value: props.item.id } });
        }
        if (typeof props.item.drive_id == 'string') {
            handleChangeCategoryDriveId({ target: { value: props.item.drive_id } });
        }
        setIsInitial(false);
    } else if (isInitial) {
        setIsInitial(false);
    }

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '20px' }}>
                <FormControl component='fieldset'>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='adult'
                            control={
                                <Switch
                                    color='primary'
                                    checked={isAdult}
                                    onChange={handleChangeCategoryAdult}
                                />
                            }
                            label='Adult'
                            labelPlacement='start'
                        />
                    </FormGroup>
                </FormControl>
                <FormControl component='fieldset'>
                    <FormGroup aria-label='position' row>
                        <FormControlLabel
                            value='anime'
                            control={
                                <Switch
                                    color='primary'
                                    checked={isAnime}
                                    onChange={handleChangeCategoryAnime}
                                />
                            }
                            label='Anime'
                            labelPlacement='start'
                        />
                    </FormGroup>
                </FormControl>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id='category-provider-label'>Provider</InputLabel>
                        <Select
                            labelId='category-provider-label'
                            id='category-provider-select'
                            value={categoryProvider}
                            label='Provider'
                            onChange={handleChangeCategoryProvider}
                            sx={textFieldStyles}
                        >
                            <MenuItem value={'gdrive'}>Google Drive</MenuItem>
                            <MenuItem value={'onedrive'}>OneDrive</MenuItem>
                            <MenuItem value={'sharepoint'}>SharePoint</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id='category-type-label'>Type</InputLabel>
                        <Select
                            labelId='category-type-label'
                            id='category-type-select'
                            value={categoryType}
                            label='Type'
                            onChange={handleChangeCategoryType}
                            sx={textFieldStyles}
                        >
                            <MenuItem value={'movie'}>Movies</MenuItem>
                            <MenuItem value={'serie'}>TV Series</MenuItem>
                            <MenuItem value={'music'}>Music</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id='category-language-label'>Language</InputLabel>
                        <Select
                            labelId='category-language-label'
                            id='category-language-select'
                            value={categoryLanguage}
                            label='Language'
                            onChange={handleChangeCategoryLanguage}
                            sx={textFieldStyles}
                        >
                            <MenuItem value={'ar'}>Arabic</MenuItem>
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'zh'}>Chinese</MenuItem>
                            <MenuItem value={'hi'}>Hindi</MenuItem>
                            <MenuItem value={'ja'}>Japanese</MenuItem>
                            <MenuItem value={'pt'}>Portuguese</MenuItem>
                            <MenuItem value={'es'}>Spanish</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TextField
                sx={textFieldStyles}
                fullWidth
                label='Category Name'
                value={categoryName}
                onChange={handleChangeCategoryName}
            />
            <TextField
                sx={textFieldStyles}
                fullWidth
                label='Folder ID'
                value={categoryId}
                onChange={handleChangeCategoryId}
            />
            <TextField
                fullWidth
                label='Drive ID'
                value={categoryDriveId}
                onChange={handleChangeCategoryDriveId}
            />
        </Box>
    );
};

export default SingleCategory;
