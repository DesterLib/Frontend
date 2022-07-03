import { Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import React, { useEffect, useState } from 'react';

import { APP_OS } from '../../config';
import DButton from '../DButton';
import { InfoModal } from './styles';

const DExternalModal = ({ videoData, currentState, closeInfoModal }: any) => {
    const [mobileUrl, setMobileUrl] = useState<string>('');

    useEffect(() => {
        if (APP_OS === 'Android') {
            const streamUrl = new URL(videoData.url);
            const scheme = streamUrl.protocol.slice(0, -1);
            streamUrl.hash = `Intent;action=android.intent.action.VIEW;scheme=${scheme};type=video/x-matroska;S.title=${encodeURIComponent(
                videoData.title,
            )};end`;
            streamUrl.protocol = 'intent';
            setMobileUrl(streamUrl.toString());
        } else if (APP_OS === 'iOS') {
            const streamUrl = new URL(videoData.url);
            streamUrl.host = 'x-callback-url';
            streamUrl.port = '';
            streamUrl.pathname = 'stream';
            streamUrl.search = `url=${videoData.url}`;
            streamUrl.protocol = 'vlc-x-callback';
            setMobileUrl(streamUrl.toString());
        }
    }, [videoData]);

    const handleShare = () => {
        navigator
            .share({
                title: window.document.title,
                url: window.location.origin,
            })
            .then(() => {
                console.log('Thanks for sharing!');
            })
            .catch(console.error);
    };

    return (
        <InfoModal
            onClose={closeInfoModal}
            aria-labelledby='customized-dialog-title'
            open={currentState}
            fullWidth={false}
            maxWidth='md'
        >
            <DialogContent dividers>
                <Grid container>
                    <Grid sx={{ marginRight: '5px' }} item>
                        <a href={videoData.url}>
                            <DButton startIcon={<i className='ri-download-cloud-fill'></i>}>
                                Download
                            </DButton>
                        </a>
                    </Grid>
                    <Grid sx={{ marginRight: '5px' }} item>
                        <DButton
                            onClick={handleShare}
                            startIcon={<i className='ri-share-fill'></i>}
                        >
                            Share
                        </DButton>
                    </Grid>
                    {APP_OS === 'Windows' && (
                        <Grid sx={{ marginRight: '5px' }} item>
                            <a href={`potplayer://${videoData.url}`}>
                                <DButton startIcon={<i className='ri-play-circle-fill'></i>}>
                                    PotPlayer
                                </DButton>
                            </a>
                        </Grid>
                    )}
                    {mobileUrl !== '' && (
                        <Grid sx={{ marginRight: '5px' }} item>
                            <a href={mobileUrl}>
                                <DButton startIcon={<i className='ri-video-fill'></i>}>
                                    Player
                                </DButton>
                            </a>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
        </InfoModal>
    );
};

export default DExternalModal;
