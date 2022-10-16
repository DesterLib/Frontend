import { alpha, Box, styled, Typography } from '@mui/material';
import Button from 'components/button';
// import Chip from 'components/chip';
import Icon from 'components/icon';
import IconButton from 'components/iconbutton';
import React from 'react';

type Props = {
    item: any;
};

const StyledSlideMainContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
}));

const StyledSlideThumbnailContainer = styled(Box)(({ theme }) => ({
    pointerEvents: 'auto',
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: alpha(theme.palette.text.secondary, 0.1),
    padding: '3px',
    borderRadius: theme.shape.borderRadius,
}));

const StyledSlideMainDetails = styled(Box)<{ src: string }>(({ theme, src }) => ({
    background: `linear-gradient(${alpha(theme.palette.background.paper, 0.7)}, ${
        theme.palette.background.paper
    }), url(${src})`,
    width: '100%',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    aspectRatio: '23/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
}));

const StyledSlideThumbnailDetails = styled(Box)<{ src: string }>(({ theme, src }) => ({
    backgroundImage: `url(${src})`,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    aspectRatio: '16/9',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'end',
    padding: '0px',
    borderRadius: theme.shape.borderRadius,
}));

const SlidePosterContainer = styled(Box)<{ src: string }>(({ theme, src }) => ({
    backgroundImage: `url(${src})`,
    // width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    aspectRatio: '11/16',
    // display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'end',
    // padding: '0px',
    // borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: '280px',
    borderRadius: '10px',
    margin: '40px',
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
}));

const StyledTextDetails = styled(Box)({
    display: 'block',
});

const StyledSlideMainActionButtons = styled(Box)({
    display: 'block',
    '& > *': { marginRight: '10px !important' },
});

const SlideThumbnail = (props: Props) => {
    const { item } = props;
    return (
        <StyledSlideThumbnailContainer>
            <StyledSlideThumbnailDetails
                src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${item.backdrop_path}`}
            />
        </StyledSlideThumbnailContainer>
    );
};

const SlideMain = (props: Props) => {
    const { item } = props;
    return (
        <StyledSlideMainContainer>
            <StyledSlideMainDetails
                src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${item.backdrop_path}`}
            >
                <Box sx={{ position: 'absolute', bottom: '0', left: '0', padding: '40px' }}>
                    <StyledTextDetails>
                        <Typography variant='h4' sx={{ marginBottom: '20px', fontWeight: '700' }}>
                            {item.name || item.title}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                marginBottom: '20px',
                                '& > *': { marginRight: '10px !important' },
                            }}
                        >
                            <Typography>Action</Typography>
                            <Typography>Fantasy</Typography>
                        </Box>
                    </StyledTextDetails>
                    <StyledSlideMainActionButtons>
                        <Button
                            onClick={() => console.log('pressed')}
                            size='large'
                            variant='contained'
                        >
                            Play Now
                        </Button>
                        <IconButton color='error'>
                            <Icon name='favorite' />
                        </IconButton>
                        <IconButton color='secondary'>
                            <Icon name='more_vert' />
                        </IconButton>
                    </StyledSlideMainActionButtons>
                </Box>
                <SlidePosterContainer
                    src={`https://www.themoviedb.org/t/p/w500${item.poster_path}`}
                />
            </StyledSlideMainDetails>
        </StyledSlideMainContainer>
    );
};

export { SlideMain, SlideThumbnail };
