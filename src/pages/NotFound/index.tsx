import React from 'react';
import { Link } from 'react-router-dom';

import DButton from '../../components/DButton';
import { APP_ERROR_IMAGE } from '../../config';
import {
    DetailsContainer,
    ErrorText,
    Image,
    ImageWrapper,
    MainContainer,
    NavigationContainer,
} from './styles';

const NotFoundPage = () => {
    return (
        <MainContainer>
            <ImageWrapper>
                <Image src={APP_ERROR_IMAGE} alt='' />
            </ImageWrapper>
            <DetailsContainer>
                <ErrorText variant='h5'>404 - You Lost ?</ErrorText>
                <NavigationContainer>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <DButton
                            variant='contained'
                            color='primary'
                            startIcon={
                                <i
                                    style={{ fontSize: '16px', fontWeight: 'bold' }}
                                    className='ri-home-line'
                                ></i>
                            }
                        >
                            Go Home
                        </DButton>
                    </Link>
                    <DButton
                        href='/'
                        variant='contained'
                        color='primary'
                        startIcon={
                            <i
                                style={{ fontSize: '16px', fontWeight: 'bold' }}
                                className='ri-search-2-line'
                            ></i>
                        }
                    >
                        Search
                    </DButton>
                </NavigationContainer>
            </DetailsContainer>
        </MainContainer>
    );
};

export default NotFoundPage;
