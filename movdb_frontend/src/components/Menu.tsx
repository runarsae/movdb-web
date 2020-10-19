import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Selection from "./menu_components/Selection";
import IntervalSlider from "./menu_components/IntervalSlider";
import { useApolloClient, gql } from '@apollo/client';

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
      backgroundColor: "white"
    },
    btnConfirm: {
      width: "15%",
      marginTop: "50px",
      marginBottom: "50px",
      marginLeft: "auto",
      marginRight: "auto",
    }
  }));

interface menuValues {
  genres: string[]
  production_companies: string[]
  production_countries: string[]
  release_interval: number[]
  runtimes_interval: number[]
}

function Menu(){
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
    });
    const client = useApolloClient();
    const defaultMenuValues : menuValues | null = client.cache.readQuery({
      query: gql`
        query menu_parameters{
          Menu @client
        }
      `,
    })
    const [menuValues, changeMenuValues] = React.useState<menuValues | null>(defaultMenuValues);
    React.useEffect(()=>{
      client.cache.writeQuery({
        query: gql`
          query menu_parameters{
            Menu{
              genres
              production_companies
              production_countries
              release_interval
              runtimes_interval
            }
          }
        `,
        data: {
          Menu: [menuValues]
        }
      })
    }, [menuValues])
    
  const toggleDrawer = () => {
    setState({ open: !state.open});
  }

  //Prop values that get passed to menu components, only for testing. real data should be given by the provider
  const Genres : string[] | null = client.readQuery({
    query: gql`
      query movies{
        genres
      }
    `,
  });

  const Companies : string[] | null = client.readQuery({
    query: gql`
      query movies{
        production_companies
      }
    `,
  });
  const Countries : string[] = [
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
                    <Selection label="Genre" optionValues={Genres} onSelectionChange={(list) => {
                      changeMenuValues({...menuValues, genres: list})
                    }} values={menuValues.genres}/>
                    <Selection label="Country" optionValues={Countries} onSelectionChange={(list) => {
                      changeMenuValues({...menuValues?, production_countries: list})
                    }} values={menuValues?.production_countries} />
                    <Selection label="Production Company" optionValues={Companies} onSelectionChange={(list) => {
                      changeMenuValues({...menuValues?, production_companies: list})
                    }} values={menuValues?.production_companies}/>
                    <IntervalSlider label="Realese Date" defaultValues={releaseDates} onIntervalChange={(list) => {
                      changeMenuValues({...menuValues?, release_interval: list})
                    }} values={menuValues?.release_interval}/>
                    <IntervalSlider label="Runtime" defaultValues={runtimes} onIntervalChange={(list) => {
                      changeMenuValues({...menuValues?, runtimes_interval: list})
                    }} values={menuValues?.runtimes_interval}/>
                    <Button 
                      variant="contained"
                      classes={{root: classes.btnConfirm}}
                      onClick={toggleDrawer}
                      color="primary"
                    >
                      Select
                    </Button>
            </Drawer>
    </div>
    );
  }


export default Menu;