import React from 'react';

import DButton from '../../components/DButton';
import { APP_DISCONNECTED_IMAGE } from '../../config';
import {
    DetailsContainer,
    ErrorText,
    Image,
    ImageWrapper,
    MainContainer,
    NavigationContainer,
} from './styles';

const DisconnectedPage = () => {
    return (
        <MainContainer>
            <ImageWrapper>
                <Image src={APP_DISCONNECTED_IMAGE} alt='' />
            </ImageWrapper>
            <DetailsContainer>
                <ErrorText variant='h5'>404 - Cannot Connect to the Server/Backend</ErrorText>
                <NavigationContainer>
                    <DButton
                        href='/'
                        variant='contained'
                        color='primary'
                        startIcon={
                            <i
                                style={{ fontSize: '16px', fontWeight: 'bold' }}
                                className='ri-refresh-line'
                            ></i>
                        }
                    >
                        REFRESH
                    </DButton>
                </NavigationContainer>
            </DetailsContainer>
        </MainContainer>
    );
};

export default DisconnectedPage;
