import React, {ChangeEvent, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {Interval} from "./Menu";

const useStyles = makeStyles({
    mark: {
        backgroundColor: "transparent"
    },
    markText: {
        color: "#CECECE",
        fontSize: "12px"
    }
});

interface Props {
    label: string;
    optionValues: Interval;
    onValueChange: (value: Interval) => void;
    values: Interval;
}

function IntervalSlider(props: Props) {
    const classes = useStyles();

    const [value, setValue] = useState<Interval>(props.values);

    // Update internal state when values prop changes
    useEffect(() => {
        setValue(props.values);
    }, [props.values]);

    // Update internal state on slider change
    const handleChange = (event: ChangeEvent<{}>, value: number | number[]) => {
        setValue({start: (value as number[])[0], end: (value as number[])[1]});
    };

    // Convert number to text
    function valuetext(value: number) {
        return value.toString();
    }

    // Marks below the slider
    const marks = [
        {
            value: props.optionValues.start,
            label: props.optionValues.start
        },
        {
            value: props.optionValues.end,
            label: props.optionValues.end
        }
    ];

    return (
        <div>
            <Typography gutterBottom>{props.label}</Typography>

            <Slider
                value={[value.start, value.end]}
                onChange={handleChange}
                onChangeCommitted={() => props.onValueChange(value)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={props.optionValues.start}
                max={props.optionValues.end}
                marks={marks}
                classes={{
                    mark: classes.mark,
                    markLabel: classes.markText,
                    markLabelActive: classes.markText
                }}
            />
        </div>
    );
}

export default IntervalSlider;
