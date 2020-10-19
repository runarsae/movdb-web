import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  	root: {
		width: "80%",
        minWidth: "150px",
		marginTop: "50px",
      	marginLeft: "auto",
      	marginRight: "auto"
  	},
});

export interface props{
    label: string
	defaultValues: number[]
	onIntervalChange: (list : number[]) => void
	values: number[]
}

function IntervalSlider(props: props){
    const classes = useStyles();
	const [value, setValue] = React.useState<number[]>(props.values);
	React.useEffect(()=>{
        props.onIntervalChange(value)
    },[value])
	const MIN = props.defaultValues[0]
	const MAX = props.defaultValues[1]
  
	const handleChange = (event: any, newValue: number | number[]) => {
	  setValue(newValue as number[]);
	};

    function valuetext(value: number) {
        return value.toString();
    }

    return(
		<div className={classes.root}>
      		<Typography id="range-slider" gutterBottom>
        		{props.label}
      		</Typography>
      	<Slider
			value={value}
			onChange={handleChange}
			valueLabelDisplay="auto"
			aria-labelledby="range-slider"
			getAriaValueText={valuetext}
			min = {MIN}
			max = {MAX}
      />
    </div>
    );
}

export default IntervalSlider;