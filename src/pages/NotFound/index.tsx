import React from 'react';
import { Link } from 'react-router-dom';

import Error from '../../assets/error.png';
import DButton from '../../components/DButton';
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
                <Image src={Error} alt='' />
            </ImageWrapper>
            <DetailsContainer>
                <ErrorText variant='h4'>404 - You Lost ?</ErrorText>
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
