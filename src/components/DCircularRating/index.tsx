import CircularProgress, {
    CircularProgressProps,
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import { CircularRatingWrapper, RatingTypographyWrapper } from './styles';

const CircularRating = (props: CircularProgressProps & { value: number }) => {
    return (
        <CircularRatingWrapper>
            <CircularProgress
                sx={{
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                variant='determinate'
                {...props}
            />
            <RatingTypographyWrapper>
                <Typography variant='caption' component='div' color='text.primary'>{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </RatingTypographyWrapper>
        </CircularRatingWrapper>
    );
};

export default CircularRating;
