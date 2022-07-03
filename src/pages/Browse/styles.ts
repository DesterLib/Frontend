import styled from '@emotion/styled';
import Box, { BoxProps } from '@mui/system/Box';

import DButton from '../../components/DButton';

export const MainContainer = styled(Box)<BoxProps>(() => ({
    width: '100%',
    height: '100%',
    padding: '20px',
}));

export const ShowMoreButton = styled(DButton)(() => ({
    padding: '5px 5px 5px 20px',
}));
