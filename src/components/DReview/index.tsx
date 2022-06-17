import Box from '@mui/material/Box';
import React from 'react';

import DReviewCard from './DReviewCard';
import { ChipIndex, Heading, ListWrapper, ShowMoreButton } from './styles';

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
        <ListWrapper>
            {itemData && itemData.length > 0 && (
                <>
                    <Heading variant='h5'>{title || null}</Heading>
                    <Box sx={{ padding: '20px' }}>
                        {itemsToShow.length ? itemsToShow : 'Loading...'}
                    </Box>
                    {itemData.length - numberOfitemsShown > 0 ? (
                        <Box sx={{ padding: '20px' }}>
                            <ShowMoreButton disableElevation variant='contained' onClick={showMore}>
                                More
                                <ChipIndex label={itemData.length - numberOfitemsShown} />
                            </ShowMoreButton>
                        </Box>
                    ) : null}
                </>
            )}
        </ListWrapper>
    );
};

export default DReviewList;
