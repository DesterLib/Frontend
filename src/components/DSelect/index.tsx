import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { DropDownSelectItem } from './styles';

const DSelect = ({ width }: any) => {
    const [season, setSeason] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSeason(event.target.value as string);
    };
    return (
        <FormControl sx={{width: width}}>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={season}
                onChange={handleChange}
                displayEmpty
                sx={{backgroundColor: '#ffffff', color: '#000000', height: '40px'}}
            >
                <DropDownSelectItem value=''>Season 01</DropDownSelectItem>
                <DropDownSelectItem value={20}>Season 02</DropDownSelectItem>
                <DropDownSelectItem value={30}>Season 03</DropDownSelectItem>
            </Select>
        </FormControl>
    );
};

export default DSelect;
