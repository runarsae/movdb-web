import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: "80%",
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            color: theme.palette.primary.light
        },
        chips: {
            display: "flex",
            flexWrap: "wrap"
        },
        chip: {
            margin: 2
        },
        inputLabel: {
            // Prevent label jumping when shrinking due to changed input field sizes
            transform: "translate(0, 34px) scale(1)",
            "&.MuiInputLabel-shrink": {
                transform: "translate(0, 1.5px) scale(0.75)"
            }
        },
        select: {
            minHeight: 36,
            height: "auto",
            paddingLeft: 4
        }
    })
);

export interface Props {
    label: string;
    optionValues: string[];
    onValueChange: (value: string[]) => void;
    values: string[];
}

function Selection(props: Props) {
    const classes = useStyles();

    const [selected, setSelected] = useState<string[]>(props.values);

    const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSelected(event.target.value as string[]);
    };

    useEffect(() => {
        setSelected(props.values);
    }, [props.values]);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250
            }
        },
        getContentAnchorEl: null
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel classes={{root: classes.inputLabel}}>{props.label}</InputLabel>

            <Select
                multiple
                displayEmpty
                value={selected}
                onClose={() => {
                    props.onValueChange(selected);

                    // Remove input field focus when selection is closed
                    setTimeout(() => {
                        (document.activeElement! as HTMLElement).blur();
                    }, 60);
                }}
                onChange={handleChange}
                input={<Input />}
                classes={{root: classes.select}}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} className={classes.chip} color="primary" />
                        ))}
                    </div>
                )}
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
