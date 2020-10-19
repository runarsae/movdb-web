import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) => createStyles({
    formControl: {
        margin: 1,
        width: "80%",
        minWidth: "150px",
        marginTop: "50px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "50px",
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: 3,
      },
  }));
  
export interface props{
    label: string,
    optionValues: string[] | null,
    onSelectionChange: (list : string[] | undefined) => void
    values: string[] | undefined
}

function Selection(props: props){
    const classes = useStyles();

    const [options, setOptionName] = React.useState<string[] | undefined>(props.values);
    React.useEffect(()=>{
        props.onSelectionChange(options)
    },[options])
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOptionName(event.target.value as string[]);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        getContentAnchorEl: null
    };

    return(
        <FormControl className={classes.formControl}>
                <InputLabel>{props.label}</InputLabel>
                    <Select
                    multiple
                    value={options}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} className={classes.chip} color="primary"/>
                        ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                    >
                        {props.optionValues?.map((option) => (
                            <MenuItem key={option as string} value={option as string}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
            </FormControl>
    );
}

export default Selection;