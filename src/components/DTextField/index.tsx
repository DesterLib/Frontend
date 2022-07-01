import React from 'react';

import { StyledTextField } from './styles';

const DTextField = ({ ...props }) => {
    return <StyledTextField size='small' {...props} />;
};

export default DTextField;
