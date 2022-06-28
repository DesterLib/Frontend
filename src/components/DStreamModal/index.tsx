import DPlayer from '@desterlib/dplayer';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

import isElectron from '../../utilities/isElectron';
import WPlayer from '../WPlayer';
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
                    {isElectron() ? (
                        <DPlayer
                            url={videoData.url}
                            title={videoData.title}
                            subTitle={videoData.subtitle}
                            id={videoData.id}
                        />
                    ) : (
                        <WPlayer aspectRatio='21/9' videoData={videoData} />
                    )}
                </Box>
            </DialogContent>
        </InfoModal>
    );
};

export default DStreamModal;
