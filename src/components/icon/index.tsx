import React from 'react';

type IconProps = {
    name: string;
    style?: any
};

const Icon = (props: IconProps) => {
    const { name, style } = props;
    return (
        <span style={style} className='material-symbols-rounded'>
            {name}
        </span>
    );
};

export default Icon;
