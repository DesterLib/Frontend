import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

import guid from '../utilities/guid';
import SingleCategory from './SingleCategory';

const CategoryList = () => {
    var importedCategories: any = [];
    if (localStorage.getItem('categories') === null) {
        importedCategories = [];
    } else {
        importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    }

    var tempCategories: any = [];
    for (let i = 0; i < importedCategories.length; i++) {
        const item = importedCategories[i];
        tempCategories.push(<SingleCategory key={guid()} item={item} index={i} />);
    }

    var index = tempCategories.length;

    const [categories, setCategories] = useState<any>(tempCategories);

    const handleAddCategory = () => {
        setCategories(categories.concat(<SingleCategory key={guid()} index={index} />));
        importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories.push({});
        localStorage.setItem('categories', JSON.stringify(importedCategories));
        index += 1;
    };

    const handleRemoveCategory = () => {
        setCategories(categories.slice(0, -1));
        importedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        importedCategories = importedCategories.slice(0, -1);
        localStorage.setItem('categories', JSON.stringify(importedCategories));
        index -= 1;
    };

    const handleClearAll = () => {
        setCategories([]);
        localStorage.setItem('categories', '[]');
    };

    return (
        <Box>
            <Box sx={{ paddingBottom: '20px' }}>
                <Button
                    color='error'
                    variant='outlined'
                    startIcon={<DeleteRoundedIcon />}
                    onClick={handleClearAll}
                >
                    Clear All Categories
                </Button>
            </Box>
            <Box>{categories}</Box>
            <Box>
                <Button
                    startIcon={<AddRoundedIcon />}
                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                    variant='contained'
                    onClick={handleAddCategory}
                >
                    Add Category
                </Button>
                <Button
                    color='warning'
                    startIcon={<CancelRoundedIcon />}
                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                    variant='outlined'
                    onClick={handleRemoveCategory}
                >
                    Remove Category
                </Button>
            </Box>
        </Box>
    );
};

export default CategoryList;
