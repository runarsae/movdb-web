import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Selection from "./Selection";
import IntervalSlider from "./IntervalSlider";
import {useApolloClient, useQuery} from "@apollo/client";
import {MENU_OPEN, MENU_VALUES, MENU_OPTIONS} from "../../queries";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuContainer: {
            maxWidth: "500px",
            width: "100%",
            height: "100%",
            padding: "50px",
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            "& > *": {
                marginBottom: "50px"
            }
        },
        buttonGroup: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        button: {
            width: "auto",
            display: "block",
            "&:first-child": {
                marginRight: theme.spacing(2)
            }
        },
        btnClose: {
            position: "absolute",
            right: "-12px",
            top: "-12px"
        },
        btnHolder: {
            width: "100%",
            position: "relative",
            height: "50px",
            marginLeft: "auto",
            marginRight: "auto"
        },
        "@global": {
            "*::-webkit-scrollbar": {
                width: "8px",
                height: "4px"
            },
            "*::-webkit-scrollbar-track": {
                backgroundColor: "transparent"
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: "#C1C1C1",
                borderRadius: "4px"
            },
            "*::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#A8A8A8"
            }
        }
    })
);

export interface Interval {
    start: number;
    end: number;
}

interface Parameters {
    genres: string[];
    productionCountries: string[];
    releaseDateInterval: Interval;
    runtimeInterval: Interval;
}

function Menu() {
    const client = useApolloClient();

    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuValues, setMenuValues] = useState<Parameters | null>();
    const [menuOptions, setMenuOptions] = useState<Parameters | null>();

    const {data: menuOpenData} = useQuery(MENU_OPEN);

    useEffect(() => {
        if (menuOpenData) {
            setMenuOpen(menuOpenData.menuOpen);
        }
    }, [menuOpenData]);

    const {data: menuOptionsData, refetch} = useQuery(MENU_OPTIONS);

    if (!menuOptionsData) {
        refetch();
    }

    useEffect(() => {
        if (menuOptionsData) {
            setMenuOptions(menuOptionsData.menuOptions);
            setDefaultMenuValues(menuOptionsData.menuOptions);
        }
    }, [menuOptionsData]);

    const setDefaultMenuValues = (options: Parameters) => {
        const defaultMenuValues: Parameters = {
            genres: [],
            productionCountries: [],
            releaseDateInterval: {
                start: options.releaseDateInterval.start,
                end: options.releaseDateInterval.end
            },
            runtimeInterval: {
                start: options.runtimeInterval.start,
                end: options.runtimeInterval.end
            }
        };

        setMenuValues(defaultMenuValues);
    };

    useEffect(() => {
        if (!menuOpen && menuValues) {
            client.cache.writeQuery({
                query: MENU_VALUES,
                data: {
                    menuValues: menuValues
                }
            });
        }
    }, [menuValues, menuOpen, client.cache]);

    const toggleDrawer = () => {
        client.cache.writeQuery({
            query: MENU_OPEN,
            data: {
                menuOpen: false
            }
        });
    };

    const handleValueChange = (type: string, value: string[] | Interval) => {
        // Overwrite the old menu value with the updated one for the given type
        const updatedMenuValues = {
            ...menuValues!,
            [type]: value
        };

        // Save updated menu values to state
        setMenuValues(updatedMenuValues);
    };

    return (
        <div>
            {menuValues && menuOptions && (
                <Drawer anchor="right" open={menuOpen} onClose={toggleDrawer} classes={{paper: classes.menuContainer}}>
                    <div className={classes.btnHolder}>
                        <Typography variant="h5" color="initial">
                            Filter
                        </Typography>
                        <IconButton aria-label="close" onClick={toggleDrawer} className={classes.btnClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Selection
                        label="Genres"
                        optionValues={menuOptions.genres}
                        values={menuValues.genres}
                        onValueChange={(value: string[]) => handleValueChange("genres", value)}
                    />

                    <Selection
                        label="Production Countries"
                        optionValues={menuOptions.productionCountries}
                        values={menuValues.productionCountries}
                        onValueChange={(value: string[]) => handleValueChange("productionCountries", value)}
                    />

                    <IntervalSlider
                        label="Release Year"
                        optionValues={menuOptions.releaseDateInterval}
                        values={menuValues.releaseDateInterval}
                        onValueChange={(value: Interval) => handleValueChange("releaseDateInterval", value)}
                    />

                    <IntervalSlider
                        label="Runtime"
                        optionValues={menuOptions.runtimeInterval}
                        values={menuValues.runtimeInterval}
                        onValueChange={(value: Interval) => handleValueChange("runtimeInterval", value)}
                    />

                    <div className={classes.buttonGroup}>
                        <Button
                            color="secondary"
                            className={classes.button}
                            onClick={() => setDefaultMenuValues(menuOptionsData.menuOptions)}
                        >
                            Reset
                        </Button>

                        <Button variant="contained" className={classes.button} onClick={toggleDrawer} color="primary">
                            Confirm
                        </Button>
                    </div>
                </Drawer>
            )}
        </div>
    );
}

export default Menu;
