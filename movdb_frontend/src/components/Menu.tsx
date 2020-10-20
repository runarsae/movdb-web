import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Selection from "./menu_components/Selection";
import IntervalSlider from "./menu_components/IntervalSlider";
import {useApolloClient} from "@apollo/client";
import {MENU_VALUES} from "../queries";

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
    production_companies: string[];
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

    // Prop values that get passed to menu components, only for testing. real data should be given by the provider
    const genres: string[] = ["Action", "Drama", "Fantasy"];
    const companies: string[] = ["Pixar", "Walt Disney", "Warner Bros"];
    const countries: string[] = ["USA", "France", "Sweden", "Thailand", "Australia"];

    //oldest-movie-newest-movie interval, in years only
    const releaseDates: number[] = [1950, 2020];

    //shortes-runtime-longest-runtime interval, in minutes
    const runtimes: number[] = [30, 180];

    return (
        <div>
            <Button onClick={toggleDrawer}>Show menu</Button>

            {menuValues && (
                <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer} classes={{paper: classes.menuContainer}}>
                    <Selection
                        label="Genres"
                        optionValues={genres}
                        values={menuValues.menuValues.genres}
                        onValueChange={(value: string[]) => handleValueChange("genres", value)}
                    />

                    <Selection
                        label="Production Countries"
                        optionValues={countries}
                        values={menuValues.menuValues.production_countries}
                        onValueChange={(value: string[]) => handleValueChange("production_countries", value)}
                    />

                    <Selection
                        label="Production Companies"
                        optionValues={companies}
						values={menuValues.menuValues.production_companies}
						onValueChange={(value: string[]) => handleValueChange("production_companies", value)}
                    />

					<IntervalSlider
						label="Release Date"
						interval={releaseDates}
						values={menuValues.menuValues.release_interval}
						onValueChange={(value: number[]) => handleValueChange("release_interval", value)}
					/>

					<IntervalSlider
						label="Runtime"
						interval={runtimes}
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
