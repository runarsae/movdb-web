import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Selection from "./menu_components/Selection";
import IntervalSlider from "./menu_components/IntervalSlider";

const useStyles = makeStyles((theme: Theme) => createStyles({
    menuContainer: {
      maxWidth:"500px",
      width:"100%",
      [theme.breakpoints.up("sm")]: {
        top: "80px",
        height: "calc(100% - 80px)",
      },
      [theme.breakpoints.down("sm")]:{
        height: "calc(100% - 132px)",
        top: "132px",
      },
      backgroundColor: theme.palette.secondary.main
    },
    btnConfirm: {
      width: "15%",
      marginTop: "50px",
      marginBottom: "50px",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: theme.palette.primary.main,
    }
  }));


function Menu(){
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
  });

  const toggleDrawer = () => {
    setState({ open: !state.open});
  }

  //Prop values that get passed to menu components, only for testing. real data should be given by the provider
  const Genres : String[] = [
    'Horror',
    'Fantasy',
    'Sci-Fi',
    'Thriller',
    'Action',
  ];

  const Companies : String[] = [
    'Warner',
    'Disney',
    'Universal',
    'Fox',
  ];
  const Countries : String[] = [
    'USA',
    'France',
    'Sweden',
    'Thailand',
    'Australia',
  ];

  //oldest-movie-newest-movie interval, in years only
  const releaseDates : number[] = [1950, 2020]

  //shortes-runtime-longest-runtime interval, in minutes
  const runtimes : number[] = [30, 180]

  return (
    <div>
            <Button onClick={toggleDrawer}>Show menu</Button>
            <Drawer 
                anchor={"right"} 
                open={state.open} 
                onClose={toggleDrawer} 
                classes={{paper: classes.menuContainer}}
                >
                    <Selection label="Genre" optionValues={Genres}/>
                    <Selection label="Country" optionValues={Countries}/>
                    <Selection label="Production Company" optionValues={Companies}/>
                    <IntervalSlider label="Realese Date" defaultValues={releaseDates}></IntervalSlider>
                    <IntervalSlider label="Runtime" defaultValues={runtimes}></IntervalSlider>
                    <Button 
                      variant="contained"
                      classes={{root: classes.btnConfirm}}
                      onClick={toggleDrawer}
                    >
                      Select
                    </Button>
            </Drawer>
    </div>
    );
  }


export default Menu;