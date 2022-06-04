import { Box, Typography } from '@mui/material';
import React from 'react';

import DReviewCard from './DReviewCard';

const DReviewList = ({ title, itemData }: any) => {
    return (
        <Box sx={{maxWidth: '900px', padding: '10px'}}>
            <Typography
                sx={{
                    padding: '0px 20px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                variant='h5'
            >
                {title || null}
            </Typography>
            <Box sx={{padding: '20px'}}>
                {itemData.map((item: any) => (
                    <DReviewCard key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default DReviewList;
