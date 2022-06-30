import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import DButton from '../../../components/DButton';
import guid from '../../../utilities/guid';
import Category from '../../Settings/pages/Categories/Category';

const StorageSlide = (props: any) => {
    const { config, updateConfig } = props;

    var tempCategories: any = [];

    if (config) {
        for (let i = 0; i < config.length; i++) {
            const item = config[i];
            tempCategories.push(
                <Category
                    key={guid()}
                    item={item}
                    index={i}
                    config={config}
                    updateConfig={updateConfig}
                />,
            );
        }
    }

    var index = tempCategories.length;

    const [categories, setCategories] = useState<any>(tempCategories);
    const [refresh, setRefresh] = useState<number>(0);

    const handleAddCategory = () => {
        setCategories(
            categories.concat(
                <Category key={guid()} index={index} config={config} updateConfig={updateConfig} />,
            ),
        );
        index += 1;
        var newConfig = config;
        newConfig.push({});
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleRemoveCategory = () => {
        setCategories(categories.slice(0, -1));
        index -= 1;
        var newConfig = config;
        newConfig.pop();
        updateConfig(newConfig);
        setRefresh(refresh + 1);
    };

    const handleClearAll = () => {
        setCategories([]);
        updateConfig([]);
        setRefresh(refresh + 1);
    };
    return (
        <Box sx={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <Typography variant='h5'>Provide your Dester Instance details</Typography>
            <Box sx={{ paddingBottom: '20px' }}>
                <DButton
                    color='error'
                    variant='outlined'
                    startIcon={<DeleteRoundedIcon />}
                    onClick={handleClearAll}
                >
                    Clear All Categories
                </DButton>
            </Box>
            <Box>{categories}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <DButton
                    startIcon={<AddRoundedIcon />}
                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                    variant='contained'
                    onClick={handleAddCategory}
                >
                    Add Category
                </DButton>
                <DButton
                    color='warning'
                    startIcon={<CancelRoundedIcon />}
                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                    variant='outlined'
                    onClick={handleRemoveCategory}
                >
                    Remove Category
                </DButton>
            </Box>
        </Box>
    );
};

export default StorageSlide;
