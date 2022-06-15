import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

import { CloseButton, InfoModal } from './styles';

const DVideoModal = ({ item, currentState, closeInfoModal }: any) => {
    return (
        <InfoModal
            onClose={closeInfoModal}
            aria-labelledby='customized-dialog-title'
            open={currentState}
            fullWidth={true}
            maxWidth='lg'
        >
            {closeInfoModal ? (
                <CloseButton aria-label='close' onClick={closeInfoModal}>
                    <i className='ri-close-line'></i>
                </CloseButton>
            ) : null}
            <DialogContent dividers>
                <Box>
                    <iframe
                        style={{ width: '100%', height: '70vh', borderRadius: '12px' }}
                        src={`https://www.youtube.com/embed/${item.key}`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;'
                        allowFullScreen
                    ></iframe>
                </Box>
            </DialogContent>
        </InfoModal>
    );
};

export default DVideoModal;
