import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import React from 'react';

import { APP_API_PATH, APP_API_VERSION_PATH, APP_POSTER_QUALITY } from '../../config';
import { Container, InfoWrapper, PersonAvatarImg, PersonAvatarWrapper, VoiceInfoTag } from './styles';

const DPersonTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text,
        border: `2px solid ${alpha(theme.palette.background.default, 0.3)}`,
        fontSize: 11,
        textAlign: 'center',
        padding: '5px 15px',
    },
}));

const DPersonCard = ({ item }: any) => {
    const theme = useTheme();
    return (
        <DPersonTooltip
            title={
                <React.Fragment>
                    <Typography color='inherit'>{item.name}</Typography>
                    <Typography color='inherit'>as</Typography>
                    <Typography color='inherit'>{item.character}</Typography>
                </React.Fragment>
            }
        >
            <Container>
                <PersonAvatarWrapper>
                    <PersonAvatarImg
                        src={
                            APP_API_PATH +
                            APP_API_VERSION_PATH +
                            '/assets/image/' +
                            APP_POSTER_QUALITY +
                            item.profile_path
                        }
                        alt={item.name}
                    />
                </PersonAvatarWrapper>
                <InfoWrapper>
                    <Typography noWrap variant='body1'>
                        {item.name}
                    </Typography>
                    <Typography
                        noWrap
                        sx={{ color: alpha(theme.palette.text.primary, 0.7), fontWeight: 'bold' }}
                        variant='body1'
                    >
                        As
                    </Typography>
                    <Typography sx={{ width: 'calc(100% - 20px)' }} noWrap variant='body2'>
                        {item.character}
                    </Typography>
                    <VoiceInfoTag>
                        <i className='ri-mic-fill'></i>
                    </VoiceInfoTag>
                </InfoWrapper>
            </Container>
        </DPersonTooltip>
    );
};

export default DPersonCard;
