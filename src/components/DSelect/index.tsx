import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

import { DropDownSelectItem } from './styles';

const DSelect = (props: any) => {
    const {
        title,
        options,
        currentOption,
        width,
        fullWidth,
        fixedValue,
        fontSize,
        onChange,
        style,
    }: any = props;
    const [option, setOption] = React.useState(currentOption);

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
        onChange ? onChange(event) : null;
    };

    const theme = useTheme();

    return (
        <FormControl
            sx={{
                width: width || '100%',
                minWidth: fullWidth || fullWidth === !undefined ? '100%' : '0px',
            }}
        >
            <FormHelperText
                sx={{
                    margin: '0px',
                    fontSize: '16px',
                    fontWeight: '500',
                    paddingBottom: '5px',
                }}
            >
                {title}
            </FormHelperText>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={option}
                onChange={handleChange}
                variant='outlined'
                MenuProps={{ keepMounted: true, disablePortal: true }}
                displayEmpty
                IconComponent={() => (
                    <span
                        style={{
                            color: theme.palette.primary.main,
                            paddingRight: '10px',
                            fontSize: '34px',
                            fontWeight: 'light',
                            pointerEvents: 'none',
                            cursor: 'pointer',
                        }}
                        className='material-symbols-rounded'
                    >
                        expand_more
                    </span>
                )}
                sx={{
                    fontSize: fontSize || 'inherit',
                    height: style && style.height ? style.height : '40px',
                    border: '0px',
                    transition: '0.2s ease-out',
                    paddingRight: '0px',
                    backgroundColor: alpha(theme.palette.background.default, 0.7),
                    backgroundImage:
                        'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.background.paper, 1),
                        boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.background.paper, 0.5)}`,
                    },
                    '& .Dester-OutlinedInput-notchedOutline': {
                        border: '0px',
                    },
                    '& .Dester-InputBase-input': {
                        textOverflow: 'clip !important',
                    },
                    ...style,
                }}
            >
                {options
                    ? options.map((item) => (
                          <DropDownSelectItem value={item} key={item}>
                              {fixedValue ? `${fixedValue} ${item}` : item}
                          </DropDownSelectItem>
                      ))
                    : props.children
                    ? props.children
                    : null}
            </Select>
        </FormControl>
    );
};

export default DSelect;
