import { Box, styled, Typography } from '@mui/material';
import useGetItem from 'hooks/useGetItem';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { demodata } from '../../../data';

const item = demodata[1];

const MainContainer = styled(Box)({
    position: 'relative',
});

const MainDetails = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '10px',
    width: '40%',
    height: '100%',
});

const MainBackdrop = styled('img')(({ theme }) => ({
    aspectRatio: '21/9',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
}));

const MoviePage = () => {
    const { response, loading, error } = useGetItem({
        path: '/movie',
        id: '453395',
    });
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Box>
            {response && (
                <MainContainer>
                    <MainBackdrop
                        src={'https://www.themoviedb.org/t/p/w1280' + item.backdrop_path}
                    />
                    <MainDetails>
                        <Typography>Hello</Typography>
                    </MainDetails>
                </MainContainer>
            )}
        </Box>
    );
};

export default MoviePage;
