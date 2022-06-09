import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import React from 'react';

import DButton from './DButton';
import DReviewCard from './DReviewCard';

const DReviewList = ({ title, itemData }: any) => {
    const [numberOfitemsShown, setNumberOfItemsToShown] = React.useState(3);

    const showMore = () => {
        if (numberOfitemsShown + 3 <= itemData.length) {
            setNumberOfItemsToShown(numberOfitemsShown + 3);
        } else {
            setNumberOfItemsToShown(itemData.length);
        }
    };

    const itemsToShow = React.useMemo(() => {
        if (itemData && itemData.length > 0) {
            return itemData
                .slice(0, numberOfitemsShown)
                .map((item: any, index: any) => (
                    <DReviewCard key={item.author + index} item={item} />
                ));
        } else {
            return [];
        }
    }, [itemData, numberOfitemsShown]);

    return (
        <Box sx={{ maxWidth: '900px', padding: '10px' }}>
            {itemData && itemData.length > 0 && (
                <>
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
                    <Box sx={{ padding: '20px' }}>
                        {itemsToShow.length ? itemsToShow : 'Loading...'}
                    </Box>
                    <Box sx={{ padding: '20px' }}>
                        <DButton
                            variant='contained'
                            sx={{ padding: '5px 5px 5px 20px' }}
                            onClick={showMore}
                        >
                            show more{' '}
                            <Chip
                                sx={{
                                    backgroundColor: '#171E22',
                                    borderRadius: '10px',
                                    padding: '0px 5px',
                                    marginLeft: '10px',
                                    marginTop: '0px',
                                    border: '2px solid #33544A',
                                }}
                                label={itemData.length - numberOfitemsShown}
                            />
                        </DButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default DReviewList;
