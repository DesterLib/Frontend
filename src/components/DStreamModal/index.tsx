import DMPV from '@desterlib/dplayer';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

import DPlayer from '../DPlayer';
import { CloseButton, InfoModal } from './styles';

const DStreamModal = ({ videoData, currentState, closeInfoModal }: any) => {
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
                    <DPlayer aspectRatio='21/9' videoData={videoData} />
                    <DMPV />
                </Box>
            </DialogContent>
        </InfoModal>
    );
};

export default DStreamModal;
