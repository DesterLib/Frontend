import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect } from 'react';

import { DropDownSelectItem } from './styles';

const DSelect = ({
    options,
    width,
    onChange = () => {
        null;
    },
    currentOption = '',
}: any) => {
    const [option, setOption] = React.useState(currentOption);

    useEffect(() => {
        setOption(currentOption);
    }, [currentOption]);

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
        onChange(event.target.value);
    };
    return (
        <FormControl sx={{ width: width }}>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={option}
                onChange={handleChange}
                displayEmpty
                sx={{ backgroundColor: '#ffffff', color: '#000000', height: '40px' }}
            >
                {options &&
                    options.map((item) => (
                        <DropDownSelectItem value={item} key={item}>
                            Season {item}
                        </DropDownSelectItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default DSelect;
