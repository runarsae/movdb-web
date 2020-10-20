import React, {ChangeEvent, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
    root: {
        width: "80%",
        marginTop: "50px",
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export interface Props {
    label: string;
    interval: number[];
    onValueChange: (value: number[]) => void;
    values: number[];
}

function IntervalSlider(props: Props) {
    const classes = useStyles();

    const [value, setValue] = useState<number[]>(props.values);    

    useEffect(() => {        
        setValue(props.values);
    }, [props.values]);

    const MIN = props.interval[0];
    const MAX = props.interval[1];

    const handleChange = (event: ChangeEvent<{}>, value: number | number[]) => {        
        setValue(value as number[])
    };

    function valuetext(value: number) {
        return value.toString();
    }

    return (
        <div className={classes.root}>
            <Typography gutterBottom>{props.label}</Typography>

            <Slider
                value={value}
                onChange={handleChange}
                onChangeCommitted={() => props.onValueChange(value)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={MIN}
                max={MAX}
            />
        </div>
    );
}

export default IntervalSlider;
