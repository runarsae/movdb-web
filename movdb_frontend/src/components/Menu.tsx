import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Selection from "./menu_components/Selection";
import IntervalSlider from "./menu_components/IntervalSlider";
import {useApolloClient} from "@apollo/client";
import {MENU_VALUES, MENU_OPTIONS} from "../queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuContainer: {
            maxWidth: "500px",
            width: "100%",
            height: "calc(100% - 132px)",
            top: "132px",
            backgroundColor: "white",
            [theme.breakpoints.up("sm")]: {
                top: "80px",
                height: "calc(100% - 80px)"
            }
        },
        btnConfirm: {
            marginTop: "50px",
            marginBottom: "50px",
            marginLeft: "auto",
            marginRight: "auto"
        }
    })
);

interface Parameters {
    genres: string[];
    production_countries: string[];
    release_interval: number[];
    runtimes_interval: number[];
}

interface MenuValues {
    menuValues: Parameters;
}

function Menu() {
    const client = useApolloClient();

    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuValues, setMenuValues] = useState<MenuValues | null>();
    const [menuOptions, setMenuOptions] = useState<Parameters | null>();

    useEffect(() => {
        async function getDefaultMenuValues() {
            const defaultMenuValues = await client.readQuery({
                query: MENU_VALUES
            });
    
            setMenuValues(defaultMenuValues);
        };

        // Get default menu values if they are not defined and menu is open
        if (menuOpen && menuValues == null) {
            getDefaultMenuValues();
        }
        
        // Write to cache if menu is closed and menu values are defined
        if (!menuOpen && menuValues) {
			console.log("Writing to cache:", menuValues);
						
            client.cache.writeQuery({
                query: MENU_VALUES,
                data: {
                    menuValues: menuValues
                }
			});
		}
    }, [menuOpen, menuValues, client]);

    const toggleDrawer = () => {
        setMenuOpen(!menuOpen);
    };

    const handleValueChange = (type: string, value: string[] | number[]) => {

        // Overwrite the old menu value with the updated one for the given type
        const updatedMenuValues = {
            menuValues: {
                ...menuValues!.menuValues,
                [type]: value
            }
		};
        
        // Save updated menu values to state
        setMenuValues(updatedMenuValues);
    };

    // Empty array in dependancy such that it is only called on mount (and unmount)
    useEffect(()=>{
      async function getAllMenuOptions() {
        const MenuOptions = await client.readQuery({
          query: MENU_OPTIONS
        })
        setMenuOptions(MenuOptions)
      }
      getAllMenuOptions()     
    }, []);

    return (
        <div>
            <Button onClick={toggleDrawer}>Show menu</Button>

            {menuValues && (
                <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer} classes={{paper: classes.menuContainer}}>
                    <Selection
                        label="Genres"
                        optionValues={menuOptions?.genres}
                        values={menuValues.menuValues.genres}
                        onValueChange={(value: string[]) => handleValueChange("genres", value)}
                    />

                    <Selection
                        label="Production Countries"
                        optionValues={menuOptions?.production_countries}
                        values={menuValues.menuValues.production_countries}
                        onValueChange={(value: string[]) => handleValueChange("production_countries", value)}
                    />

					<IntervalSlider
						label="Release Date"
            MIN={menuOptions?.release_interval[0]}
            MAX={menuOptions?.release_interval[1]}
						values={menuValues.menuValues.release_interval}
						onValueChange={(value: number[]) => handleValueChange("release_interval", value)}
					/>

					<IntervalSlider
						label="Runtime"
						MIN={menuOptions?.runtimes_interval[0]}
            MAX={menuOptions?.runtimes_interval[1]}
						values={menuValues.menuValues.runtimes_interval}
						onValueChange={(value: number[]) => handleValueChange("runtimes_interval", value)}
					/>

                    <Button
                        variant="contained"
                        classes={{root: classes.btnConfirm}}
                        onClick={toggleDrawer}
                        color="primary"
                    >
                        Select
                    </Button>
                </Drawer>
            )}
        </div>
    );
}

export default Menu;
