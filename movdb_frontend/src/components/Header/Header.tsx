import React, {useState} from "react";
import Search from "./Search";
import UserButton from "./UserButton";

import {createStyles, makeStyles, Theme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import {MENU_OPEN} from "../../queries";
import {useApolloClient, useQuery} from "@apollo/client";
import Sort from "./Sort";
import ImportExportRoundedIcon from "@material-ui/icons/ImportExportRounded";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.light,
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        toolbar: {
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            gridTemplateAreas: `"logo userbutton sortButton menubutton" 
                                "search search search search"`,
            gap: "8px",
            [theme.breakpoints.up("sm")]: {
                gridTemplateColumns: "auto 1fr auto auto auto",
                gridTemplateAreas: `"logo search userbutton sortButton menubutton"`
            }
        },
        logo: {
            gridArea: "logo",
            cursor: "pointer",
            [theme.breakpoints.up("sm")]: {
                paddingRight: "8px"
            },
            fontFamily: "Aldrich",
            fontSize: 28
        },
        menuButton: {
            gridArea: "menubutton"
        },
        sortButton: {
            girdArea: "sortButton"
        },
        tooltip: {
            marginTop: "4px"
        }
    })
);

function Header(): JSX.Element {
    const classes = useStyles();
    const [sortVisible, toggleSort] = useState<boolean>(false);
    const client = useApolloClient();

    const {data} = useQuery(MENU_OPEN);

    // Set menu open field in cache to true when menu button is clicked
    const toggleMenu = () => {
        client.cache.writeQuery({
            query: MENU_OPEN,
            data: {
                menuOpen: true
            }
        });
    };

    const handleSortVisibility = () => {
        toggleSort(!sortVisible);
    };

    return (
        <div>
            <ClickAwayListener
                onClickAway={() => {
                    // On click away, hide sort bar
                    if (sortVisible && !data.menuOpen) {
                        handleSortVisibility();
                    }
                }}
            >
                <div>
                    <AppBar className={classes.header}>
                        <Toolbar variant="dense" className={classes.toolbar}>
                            <div
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                <Typography className={classes.logo} variant="h5" color="initial">
                                    MovDB
                                </Typography>
                            </div>

                            <Search />

                            <UserButton />

                            <Tooltip title="Sort" aria-label="Sort" classes={{tooltipPlacementBottom: classes.tooltip}}>
                                <IconButton
                                    onClick={handleSortVisibility}
                                    aria-label="sorting"
                                    color="inherit"
                                    className={classes.sortButton}
                                >
                                    <ImportExportRoundedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip
                                title="Filter"
                                aria-label="Filter"
                                classes={{tooltipPlacementBottom: classes.tooltip}}
                            >
                                <IconButton
                                    className={classes.menuButton}
                                    onClick={() => toggleMenu()}
                                    aria-label="filtering"
                                    color="inherit"
                                >
                                    <TuneRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                    <Sort visible={sortVisible} />
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default Header;
